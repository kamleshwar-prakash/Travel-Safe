import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Plus, Home, Briefcase, Heart, MoreVertical, Navigation, Trash2, X } from 'lucide-react';

interface SavedPlacesProps {
  onBack: () => void;
  onNavigate: (place: string) => void;
}

interface SavedPlace {
  id: string;
  name: string;
  address: string;
  type: 'HOME' | 'WORK' | 'FAVORITE';
}

const SavedPlaces: React.FC<SavedPlacesProps> = ({ onBack, onNavigate }) => {
  const [places, setPlaces] = useState<SavedPlace[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlace, setNewPlace] = useState<{ name: string; address: string; type: 'HOME' | 'WORK' | 'FAVORITE' }>({
    name: '',
    address: '',
    type: 'FAVORITE'
  });

  useEffect(() => {
    const saved = localStorage.getItem('ts_saved_places');
    const defaults: SavedPlace[] = [
      { id: '1', name: 'Home', address: '124, Green Avenue, New Delhi', type: 'HOME' },
      { id: '2', name: 'Work', address: 'Cyber City, Gurugram, Phase 3', type: 'WORK' },
    ];

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SavedPlace[];
        if (Array.isArray(parsed)) {
          setPlaces(parsed);
          return;
        }
      } catch {
        // Fall through to defaults when storage is corrupted.
      }
    }

    setPlaces(defaults);
    localStorage.setItem('ts_saved_places', JSON.stringify(defaults));
  }, []);

  const handleAddPlace = () => {
    if (!newPlace.name || !newPlace.address) return;
    
    const place: SavedPlace = {
      id: Date.now().toString(),
      ...newPlace
    };

    const updated = [...places, place];
    setPlaces(updated);
    localStorage.setItem('ts_saved_places', JSON.stringify(updated));
    setShowAddModal(false);
    setNewPlace({ name: '', address: '', type: 'FAVORITE' });
  };

  const handleDelete = (id: string) => {
    const updated = places.filter(p => p.id !== id);
    setPlaces(updated);
    localStorage.setItem('ts_saved_places', JSON.stringify(updated));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'HOME': return <Home size={20} className="text-blue-500" />;
      case 'WORK': return <Briefcase size={20} className="text-amber-500" />;
      default: return <Heart size={20} className="text-rose-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-50 flex flex-col h-full animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm border-b border-slate-100 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black text-slate-900 uppercase tracking-wider">Saved Places</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6">
        <div className="space-y-4">
          {places.map((place) => (
            <div key={place.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group active:scale-[0.98] transition-transform relative overflow-hidden">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                {getIcon(place.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 truncate">{place.name}</h3>
                <p className="text-xs text-slate-400 truncate">{place.address}</p>
              </div>

              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => onNavigate(place.address)}
                   className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors"
                 >
                   <Navigation size={18} />
                 </button>
                 <button 
                   onClick={() => handleDelete(place.id)}
                   className="w-8 h-8 text-slate-300 hover:text-rose-500 flex items-center justify-center transition-colors"
                 >
                   <Trash2 size={18} />
                 </button>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
             <Plus size={18} />
             Add New Place
          </button>
        </div>
      </div>

      {/* Add Place Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[2100] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2rem] p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-900">Add Place</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-500">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Label</label>
                <input 
                  type="text" 
                  value={newPlace.name}
                  onChange={(e) => setNewPlace({...newPlace, name: e.target.value})}
                  placeholder="e.g. Gym, Office, Sweet Home"
                  className="w-full p-4 bg-slate-50 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Address</label>
                <input 
                  type="text" 
                  value={newPlace.address}
                  onChange={(e) => setNewPlace({...newPlace, address: e.target.value})}
                  placeholder="Search address..."
                  className="w-full p-4 bg-slate-50 rounded-xl font-medium text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Type</label>
                <div className="flex gap-2">
                  {(['HOME', 'WORK', 'FAVORITE'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewPlace({...newPlace, type})}
                      className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        newPlace.type === type 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                        : 'bg-slate-50 text-slate-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddPlace}
                disabled={!newPlace.name || !newPlace.address}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPlaces;
