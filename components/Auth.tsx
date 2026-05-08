import React, { useState } from 'react';
import { UserType } from '../types';
import { ShieldCheck, ArrowRight, Store, User, Lock, Phone } from 'lucide-react';

interface AuthProps {
  onAuthenticated: (type: UserType) => void;
  onRegisterPartner?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthenticated, onRegisterPartner }) => {
  const [step, setStep] = useState<'TYPE' | 'PHONE' | 'OTP'>('TYPE');
  const [userType, setUserType] = useState<UserType>('TRAVELER');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleSendOtp = () => {
    if (phone.length > 9) setStep('OTP');
  };

  const handleVerifyOtp = () => {
    // Mock verification
    onAuthenticated(userType);
  };

  const OtpInput = () => (
    <div className="flex gap-3 justify-center mb-8">
      {otp.map((d, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          className="w-14 h-16 rounded-2xl bg-slate-50 border-2 border-slate-200 text-center text-2xl font-black text-slate-900 focus:border-indigo-600 focus:outline-none transition-all"
          value={d}
          onChange={(e) => {
            const newOtp = [...otp];
            newOtp[i] = e.target.value;
            setOtp(newOtp);
            if (e.target.value && i < 3) {
              // Focus next input logic (simplified for mock)
            }
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[5000] bg-white flex flex-col overflow-hidden">
      {/* Dynamic Background Header */}
      <div className="h-[40%] bg-slate-900 relative rounded-b-[3rem] overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center border border-white/20 mb-6 shadow-2xl">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 font-medium mt-2">Sign in to sync your journeys</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-8 pt-12 pb-8 flex flex-col">
        
        {step === 'TYPE' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-8">
            <h2 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-widest">I am a...</h2>
            <button 
              onClick={() => { setUserType('TRAVELER'); setStep('PHONE'); }}
              className="w-full p-6 rounded-[2rem] bg-indigo-50 border-2 border-indigo-100 flex items-center gap-4 hover:bg-indigo-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                <User size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-slate-900">Traveler</h3>
                <p className="text-xs font-bold text-slate-500">Plan trips, navigation & safety</p>
              </div>
            </button>

            <button 
              onClick={() => { setUserType('BUSINESS'); setStep('PHONE'); }}
              className="w-full p-6 rounded-[2rem] bg-emerald-50 border-2 border-emerald-100 flex items-center gap-4 hover:bg-emerald-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                <Store size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-slate-900">Business</h3>
                <p className="text-xs font-bold text-slate-500">Manage services & ads</p>
              </div>
            </button>

            {onRegisterPartner && (
              <div className="pt-4 text-center">
                <p className="text-slate-400 font-medium text-xs">Want to grow your business?</p>
                <button onClick={onRegisterPartner} className="text-indigo-600 font-black text-sm mt-1 uppercase tracking-wider">Register as Partner</button>
              </div>
            )}
          </div>
        )}

        {step === 'PHONE' && (
          <div className="animate-in slide-in-from-right">
            <h2 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest">Mobile Number</h2>
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 flex items-center gap-4 mb-8 focus-within:border-indigo-500 transition-colors">
              <Phone className="text-slate-400" />
              <input 
                type="tel" 
                placeholder="98765 43210" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="bg-transparent w-full outline-none font-black text-xl text-slate-900 placeholder:text-slate-300"
                autoFocus
              />
            </div>
            <button 
              onClick={handleSendOtp}
              disabled={phone.length < 10}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 active:scale-95 transition-all"
            >
              Send Code
            </button>
            <button onClick={() => setStep('TYPE')} className="w-full mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Go Back</button>
          </div>
        )}

        {step === 'OTP' && (
          <div className="animate-in slide-in-from-right text-center">
             <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                <Lock size={28} />
             </div>
             <h2 className="text-xl font-black text-slate-900 mb-2">Verification Code</h2>
             <p className="text-slate-400 text-sm font-medium mb-8">Sent to +91 {phone}</p>
             
             <OtpInput />
             
             <button 
              onClick={handleVerifyOtp}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-200 active:scale-95 transition-all"
            >
              Verify & Login
            </button>
            <button onClick={() => setStep('PHONE')} className="w-full mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Change Number</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Auth;
