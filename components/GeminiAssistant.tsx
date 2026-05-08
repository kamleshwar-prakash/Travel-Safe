
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, Type, LiveServerMessage, Blob, FunctionDeclaration } from '@google/genai';
import { Sparkles, Send, X, Bot, User as UserIcon, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

// Audio utility functions as per coding guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface GeminiAssistantProps {
  onSetDestination: (dest: string) => void;
  onSetFilter: (filter: string) => void;
  currentDestination?: string;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ 
  onSetDestination, 
  onSetFilter,
  currentDestination 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Welcome to TravelSafe! I'm your AI Co-Pilot. I can help you plan fuel stops, suggest premium dhabas, or check weather along your route. Where's your next adventure?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Live Session Refs
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Tools for Voice Co-Pilot
  const setDestinationTool: FunctionDeclaration = {
    name: 'set_destination',
    parameters: {
      type: Type.OBJECT,
      description: 'Start navigation to a specific place or destination name.',
      properties: {
        destination: { type: Type.STRING, description: 'The name of the location to navigate to.' }
      },
      required: ['destination']
    }
  };

  const searchServicesTool: FunctionDeclaration = {
    name: 'search_services',
    parameters: {
      type: Type.OBJECT,
      description: 'Filter or find nearby travel services.',
      properties: {
        category: { 
          type: Type.STRING, 
          description: 'Category to filter: EV, FUEL, FOOD, STAY, EMERGENCY, ALL' 
        }
      },
      required: ['category']
    }
  };

  const createBlob = (data: Float32Array): Blob => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const stopVoiceSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextInRef.current) {
      audioContextInRef.current.close();
      audioContextInRef.current = null;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsVoiceActive(false);
  }, []);

  const startVoiceSession = async () => {
    try {
      setIsVoiceActive(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Ensure context is running (browser autoplay policy)
      if (audioContextOutRef.current?.state === 'suspended') {
        await audioContextOutRef.current.resume();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Tool Calls
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'set_destination') {
                  // Cast to string to fix TS error: Argument of type 'unknown' is not assignable to parameter of type 'string'
                  onSetDestination(fc.args.destination as string);
                  sessionPromise.then(s => s.sendToolResponse({
                    functionResponses: { id: fc.id, name: fc.name, response: { result: "ok, navigating to " + fc.args.destination } }
                  }));
                } else if (fc.name === 'search_services') {
                  // Cast to string to fix TS error: Property 'toUpperCase' does not exist on type 'unknown'
                  onSetFilter((fc.args.category as string).toUpperCase());
                  sessionPromise.then(s => s.sendToolResponse({
                    functionResponses: { id: fc.id, name: fc.name, response: { result: "ok, showing " + fc.args.category } }
                  }));
                }
              }
            }

            // Handle Audio Output
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const outCtx = audioContextOutRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: (e) => {
            console.error("Live session error:", e);
            stopVoiceSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are TravelSafe Voice Co-Pilot. Help users navigate safely. Current destination: ${currentDestination || 'None'}. Use tools to set destinations or search for services. Be very concise.`,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          tools: [{ functionDeclarations: [setDestinationTool, searchServicesTool] }]
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Mic access denied or session failed:", err);
      setIsVoiceActive(false);
    }
  };

  const handleSend = async () => {
    if (!prompt.trim() || isLoading) return;
    
    const userMessage = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setPrompt('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are 'TravelSafe Co-Pilot'. Help users find specific fuel types (Petrol, Diesel, CNG, EV, Hydrogen), high-safety hotels/dhabas, and road safety advice. Be concise, expert, and reassuring."
        }
      });
      
      const botText = response.text || "Safety first! Please focus on the road while I fetch that information.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm experiencing a signal drop, but keep your eyes on the road!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      stopVoiceSession();
    } else {
      startVoiceSession();
      setIsOpen(true);
    }
  };

  if (!isOpen) {
    return (
      <div className="absolute bottom-32 right-6 z-[2500] flex flex-col gap-4">
        <button 
          onClick={toggleVoice}
          className={`w-16 h-16 ${isVoiceActive ? 'bg-indigo-600' : 'bg-white'} text-slate-900 rounded-[1.75rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-[3px] border-white group`}
        >
          {isVoiceActive ? <Mic className="text-white animate-pulse" size={26} /> : <Mic className="text-slate-400 group-hover:text-indigo-600" size={26} />}
        </button>
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-slate-900 text-white rounded-[1.75rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-[3px] border-white group"
        >
          <Sparkles size={26} className="group-hover:text-indigo-400 transition-colors" />
          <div className="absolute -top-1 -right-1 bg-indigo-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
             <span className="text-[8px] font-black">AI</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-6 bottom-32 z-[3000] bg-white rounded-[2.5rem] shadow-[0_35px_100px_rgba(0,0,0,0.25)] border border-slate-100 flex flex-col max-h-[65vh] animate-in fade-in slide-in-from-bottom-8 duration-500 overflow-hidden">
      <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-indigo-50/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white relative">
             <Bot size={20} />
             {isVoiceActive && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-ping"></div>}
          </div>
          <div>
            <span className="font-black text-slate-900 text-sm tracking-tight block leading-none">Smart Co-Pilot</span>
            <span className={`text-[10px] ${isVoiceActive ? 'text-indigo-600' : 'text-emerald-600'} font-bold uppercase tracking-tighter`}>
              {isVoiceActive ? 'Voice Listening' : 'Text Active'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleVoice}
            className={`p-2 rounded-xl transition-all ${isVoiceActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}
          >
            {isVoiceActive ? <Volume2 size={18} /> : <Mic size={18} />}
          </button>
          <button onClick={() => { setIsOpen(false); stopVoiceSession(); }} className="bg-slate-100 p-2 rounded-xl text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {isVoiceActive && (
          <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-500">
             <div className="flex items-center gap-1.5 h-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 bg-indigo-500 rounded-full animate-[voice-wave_1s_infinite]" style={{ height: `${20 + Math.random() * 60}%`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mt-6">Listening for commands...</p>
             <p className="text-[11px] text-slate-400 font-medium mt-2 italic">Try "Navigate to MG Road" or "Find EV chargers"</p>
          </div>
        )}
        
        {!isVoiceActive && messages.map((m, i) => (
          <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {m.role === 'user' ? <UserIcon size={14} /> : <Bot size={14} />}
            </div>
            <div className={`max-w-[75%] px-5 py-3.5 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
              m.role === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none shadow-xl shadow-slate-100' 
                : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && !isVoiceActive && (
          <div className="flex justify-start items-center gap-3">
             <div className="w-8 h-8 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500">
                <Bot size={14} />
             </div>
             <div className="bg-slate-50 px-5 py-3 rounded-[1.5rem] rounded-tl-none flex gap-1.5 items-center border border-slate-100">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          </div>
        )}
      </div>

      {!isVoiceActive && (
        <div className="p-5 bg-white border-t border-slate-50 flex gap-3">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Plan your stops..."
            className="flex-1 bg-slate-50 border-none outline-none px-5 py-4 rounded-2xl text-sm font-bold text-slate-800 placeholder:text-slate-400"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !prompt.trim()}
            className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 active:scale-90 disabled:opacity-40 transition-all"
          >
            <Send size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;
