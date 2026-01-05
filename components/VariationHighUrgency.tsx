
import React, { useEffect } from 'react';
import { PageData } from '../types';
import { AlertTriangleIcon, ShieldCheckIcon, CheckIcon, GiftIcon } from './Icons';

interface Props {
  data: PageData;
}

const VariationHighUrgency: React.FC<Props> = ({ data }) => {
  useEffect(() => {
    // Bloqueio de clique direito
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's')) || e.key === 'F12') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-none pb-10">
      <div className="bg-red-600 py-2 px-4 text-center sticky top-0 z-40 shadow-lg border-b border-red-700">
        <p className="text-[10px] md:text-xs font-black tracking-widest uppercase text-white flex items-center justify-center gap-2">
          <span>🚨</span> {data.alertText} <span>🚨</span>
        </p>
      </div>

      <main className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-black italic uppercase leading-tight mb-2 text-white tracking-tighter">
            {data.title}
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm font-bold max-w-sm mx-auto opacity-80 uppercase tracking-widest">
            {data.subtitle}
          </p>
        </div>

        <div className="relative bg-white text-zinc-900 rounded-[2.5rem] overflow-hidden mb-8 shadow-[0_20px_70px_-10px_rgba(34,164,74,0.3)] border-4 border-zinc-100">
          <div className="absolute top-0 right-0 bg-red-600 text-white px-5 py-2 font-black italic uppercase text-[10px] rounded-bl-2xl z-10">
            50% OFF LIBERADO
          </div>
          
          <div className="pt-10 pb-8 px-6 md:px-10 text-center">
            <div className="mb-6">
                <p className="text-zinc-400 text-xl line-through font-black mb-1 opacity-50 italic">
                  {data.oldPrice}
                </p>
                <div className="flex justify-center items-center gap-1">
                    <span className="text-3xl font-black mt-2">R$</span>
                    <span className="text-8xl md:text-9xl font-black tracking-tighter leading-none">
                      {data.newPrice.replace('R$', '')}
                    </span>
                </div>
            </div>

            <a 
              href={data.checkoutUrl}
              className="block w-full bg-[#22a44a] hover:bg-green-500 text-white py-6 rounded-3xl text-xl md:text-2xl font-black uppercase tracking-tight transition-all active:scale-95 shadow-[0_8px_30px_rgba(34,164,74,0.4)] animate-pulse-custom leading-tight"
            >
              SIM, QUERO ACESSO AO<br/>MEU PLANO AGORA
            </a>
          </div>
          
          <div className="bg-zinc-50 py-4 px-6 border-t border-zinc-200">
             <div className="flex items-center justify-center gap-3 text-red-600 font-black text-[11px] md:text-xs uppercase tracking-tight text-center">
                <AlertTriangleIcon className="w-4 h-4 shrink-0" />
                <span>RESTAM POUCAS VAGAS COM ESTE VALOR!</span>
             </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-zinc-900/80 rounded-3xl p-6 border border-zinc-800">
            <h3 className="text-xs font-black uppercase italic text-zinc-400 mb-6 border-l-3 border-red-600 pl-3 tracking-widest">
              O QUE ESTÁ INCLUSO:
            </h3>
            <ul className="space-y-4">
              {data.benefits.map((text, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="bg-green-500/10 p-1 rounded-lg">
                    <CheckIcon className="w-4 h-4 text-green-500 shrink-0" />
                  </div>
                  <p className="text-zinc-300 font-bold text-xs md:text-sm leading-tight uppercase">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-4 mb-2">Bônus Exclusivos de Hoje:</p>
            {data.bonusList.map((bonus, i) => (
              <div key={i} className="bg-white flex items-center justify-between p-4 rounded-2xl border-l-8 border-green-500 shadow-md">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-green-600 uppercase tracking-widest">INCLUSO GRATUITAMENTE</span>
                  <span className="font-black text-zinc-950 text-xs md:text-sm uppercase leading-none">{bonus.title}</span>
                </div>
                <span className="text-zinc-300 line-through font-bold text-[10px] italic ml-2 shrink-0">{bonus.price}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800 backdrop-blur-sm">
            <ShieldCheckIcon className="w-10 h-10 text-green-500 shrink-0" />
            <div className="leading-tight">
                <p className="font-black uppercase text-sm tracking-tight text-white">Garantia Blindada</p>
                <p className="text-zinc-500 text-[10px] md:text-xs">
                  Se você não tiver resultados reais em até {data.guaranteeDays} dias, devolvemos cada centavo.
                </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
           <p className="text-[10px] text-zinc-800 uppercase font-black tracking-[0.3em] mb-4">Pagamento 100% Seguro & Sigiloso</p>
           <div className="flex justify-center gap-4 opacity-10 grayscale invert h-5">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
           </div>
        </div>
      </main>
    </div>
  );
};

export default VariationHighUrgency;
