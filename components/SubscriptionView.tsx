import React, { useState } from 'react';
import { Check, X, Crown, Shield, Zap, Map, CloudOff, Star, ArrowLeft } from 'lucide-react';

interface SubscriptionViewProps {
  onBack: () => void;
  currentTier: 'FREE' | 'PLUS' | 'GOLD';
  onUpgrade: (tier: 'PLUS' | 'GOLD') => void;
}

type PlanId = 'FREE' | 'PLUS' | 'GOLD';

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ onBack, currentTier, onUpgrade }) => {
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'YEARLY'>('YEARLY');

  const plans = [
    {
      id: 'FREE',
      name: 'Explorer Free',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        { name: 'Basic Navigation', included: true },
        { name: 'Community Alerts', included: true },
        { name: 'Ad-Free Experience', included: false },
        { name: 'Offline Maps', included: false },
        { name: 'Priority SOS Dispatch', included: false },
        { name: 'Advanced Weather Radar', included: false },
      ],
      color: 'bg-slate-100',
      textColor: 'text-slate-900',
      icon: <Map size={24} />,
      recommended: false
    },
    {
      id: 'PLUS',
      name: 'Voyager Plus',
      priceMonthly: 149,
      priceYearly: 1490, // ~2 months free
      features: [
        { name: 'Basic Navigation', included: true },
        { name: 'Community Alerts', included: true },
        { name: 'Ad-Free Experience', included: true },
        { name: 'Offline Maps', included: true },
        { name: 'Priority SOS Dispatch', included: false },
        { name: 'Advanced Weather Radar', included: false },
      ],
      color: 'bg-blue-50',
      textColor: 'text-blue-900',
      accentColor: 'bg-blue-600',
      icon: <Zap size={24} className="text-blue-600" />,
      recommended: false
    },
    {
      id: 'GOLD',
      name: 'Voyager Gold',
      priceMonthly: 299,
      priceYearly: 2990,
      features: [
        { name: 'Basic Navigation', included: true },
        { name: 'Community Alerts', included: true },
        { name: 'Ad-Free Experience', included: true },
        { name: 'Offline Maps', included: true },
        { name: 'Priority SOS Dispatch', included: true },
        { name: 'Advanced Weather Radar', included: true },
      ],
      color: 'bg-amber-50',
      textColor: 'text-amber-900',
      accentColor: 'bg-amber-500',
      icon: <Crown size={24} className="text-amber-600" />,
      recommended: true
    }
  ];

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-50 flex flex-col h-full overflow-hidden animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="p-6 pt-12 flex items-center justify-between bg-white shadow-sm z-10">
        <button onClick={onBack} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <span className="font-black text-slate-900 uppercase tracking-widest text-sm">Subscription Plans</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pb-20">
        {/* Header Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Upgrade your Journey</h1>
          <p className="text-slate-500 font-medium">Choose the plan that fits your travel style.</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-200 p-1.5 rounded-2xl flex relative">
            <button 
              onClick={() => setBillingCycle('MONTHLY')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all z-10 ${billingCycle === 'MONTHLY' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('YEARLY')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all z-10 flex items-center gap-2 ${billingCycle === 'YEARLY' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Yearly <span className="bg-green-100 text-green-700 text-[9px] px-1.5 py-0.5 rounded">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="space-y-6">
          {plans.map((plan) => {
            const isCurrent = currentTier === plan.id;
            const price = billingCycle === 'MONTHLY' ? plan.priceMonthly : plan.priceYearly;
            
            return (
              <div 
                key={plan.id} 
                className={`relative rounded-[2.5rem] p-6 border-2 transition-all duration-300 ${isCurrent ? 'border-green-500 bg-white ring-4 ring-green-100' : plan.recommended ? 'border-amber-400 bg-white shadow-xl shadow-amber-100' : 'border-transparent bg-white shadow-sm'}`}
              >
                {plan.recommended && !isCurrent && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                    <Check size={12} strokeWidth={4} /> Current Plan
                  </div>
                )}

                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.color}`}>
                    {plan.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-slate-900">
                      {price === 0 ? 'Free' : `₹${price}`}
                    </div>
                    {price > 0 && (
                      <div className="text-xs font-bold text-slate-400 uppercase">
                        /{billingCycle === 'MONTHLY' ? 'month' : 'year'}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className={`text-xl font-black mb-4 ${plan.textColor}`}>{plan.name}</h3>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${feature.included ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300'}`}>
                        {feature.included ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                      </div>
                      <span className={`text-sm font-bold ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {!isCurrent && (
                  <button 
                    onClick={() => {
                      if (plan.id !== 'FREE') onUpgrade(plan.id as Exclude<PlanId, 'FREE'>);
                    }}
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 ${plan.priceMonthly > 0 ? `${plan.accentColor || 'bg-slate-900'} text-white shadow-lg` : 'bg-slate-100 text-slate-400'}`}
                  >
                    {plan.priceMonthly === 0 ? 'Current Plan' : `Upgrade to ${plan.name.split(' ')[1]}`}
                  </button>
                )}
                {isCurrent && (
                  <div className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-green-50 text-green-600 text-center border border-green-100">
                    Active
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 text-center text-xs text-slate-400 font-medium px-6 leading-relaxed">
          <p>Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period. Your account will be charged for renewal within 24-hours prior to the end of the current period.</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
