
import React, { useState } from 'react';
import { ArrowLeft, UserPlus, Phone, Trash2, Edit2, ShieldAlert, Heart, Star } from 'lucide-react';
import { Contact } from '../types';

interface EmergencyContactsProps {
  onBack: () => void;
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ onBack }) => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Mom', phone: '+1 234 567 890', relation: 'Parent', isEmergency: true },
    { id: '2', name: 'John Doe', phone: '+1 987 654 321', relation: 'Partner', isEmergency: true },
    { id: '3', name: 'Alice Smith', phone: '+1 555 123 456', relation: 'Friend', isEmergency: false }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({ name: '', phone: '', relation: '', isEmergency: true });

  const handleAdd = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now().toString() } as Contact]);
      setIsAdding(false);
      setNewContact({ name: '', phone: '', relation: '', isEmergency: true });
    }
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-50 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-10 border-b border-slate-200">
        <button onClick={onBack} className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 active:scale-95 transition-transform">
           <ArrowLeft size={20} />
        </button>
        <span className="font-black text-slate-900 uppercase tracking-widest text-sm">Trusted Contacts</span>
        <button onClick={() => setIsAdding(true)} className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 text-white active:scale-95 transition-transform">
           <UserPlus size={20} />
        </button>
      </div>

      <div className="p-6 pb-20 space-y-4">
        <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 mb-6">
           <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm">
                 <ShieldAlert size={24} />
              </div>
              <div>
                 <h3 className="text-lg font-black text-indigo-900">SOS Configuration</h3>
                 <p className="text-xs font-bold text-indigo-600/80">These contacts will be notified in emergencies.</p>
              </div>
           </div>
        </div>

        {contacts.map((contact) => (
           <div key={contact.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${contact.isEmergency ? 'bg-red-500' : 'bg-slate-300'}`}>
                    {contact.name[0]}
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                       {contact.name}
                       {contact.isEmergency && <Heart size={14} className="text-red-500 fill-current" />}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{contact.relation} • {contact.phone}</p>
                 </div>
              </div>
              <button onClick={() => handleDelete(contact.id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                 <Trash2 size={20} />
              </button>
           </div>
        ))}

        {contacts.length === 0 && (
           <div className="text-center py-20 opacity-50">
              <UserPlus size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="font-bold text-slate-400">No contacts added yet</p>
           </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {isAdding && (
         <div className="fixed inset-0 z-[2100] bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-6 animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 animate-in slide-in-from-bottom-12">
               <h2 className="text-2xl font-black text-slate-900 mb-6">Add Contact</h2>
               
               <div className="space-y-4 mb-8">
                  <div>
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Full Name</label>
                     <input 
                        type="text" 
                        value={newContact.name}
                        onChange={e => setNewContact({...newContact, name: e.target.value})}
                        className="w-full bg-slate-50 p-4 rounded-xl font-bold text-slate-900 outline-none border-2 border-transparent focus:border-indigo-500 transition-colors"
                        placeholder="e.g. Mom"
                        autoFocus
                     />
                  </div>
                  <div>
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Phone Number</label>
                     <input 
                        type="tel" 
                        value={newContact.phone}
                        onChange={e => setNewContact({...newContact, phone: e.target.value})}
                        className="w-full bg-slate-50 p-4 rounded-xl font-bold text-slate-900 outline-none border-2 border-transparent focus:border-indigo-500 transition-colors"
                        placeholder="+1 234..."
                     />
                  </div>
                  <div>
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Relationship</label>
                     <input 
                        type="text" 
                        value={newContact.relation}
                        onChange={e => setNewContact({...newContact, relation: e.target.value})}
                        className="w-full bg-slate-50 p-4 rounded-xl font-bold text-slate-900 outline-none border-2 border-transparent focus:border-indigo-500 transition-colors"
                        placeholder="e.g. Parent"
                     />
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl cursor-pointer" onClick={() => setNewContact({...newContact, isEmergency: !newContact.isEmergency})}>
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${newContact.isEmergency ? 'border-red-500 bg-red-500' : 'border-slate-300 bg-white'}`}>
                        {newContact.isEmergency && <Star size={14} className="text-white fill-current" />}
                     </div>
                     <span className="font-bold text-sm text-red-900">Add to Emergency SOS list</span>
                  </div>
               </div>

               <div className="flex gap-3">
                  <button onClick={() => setIsAdding(false)} className="flex-1 py-4 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                  <button onClick={handleAdd} className="flex-1 py-4 rounded-xl font-black text-white bg-indigo-600 shadow-lg shadow-indigo-200 active:scale-95 transition-all">Save Contact</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default EmergencyContacts;
