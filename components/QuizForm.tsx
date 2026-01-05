
import React, { useState, useEffect } from 'react';

interface QuizFormProps {
  onComplete: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ onComplete }) => {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  useEffect(() => {
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

  const problems = [
    { id: 'rigidez', title: 'Falta de Rigidez', sub: 'Instabilidade durante o ato', icon: '⚡' },
    { id: 'precoce', title: 'Pouca Duração', sub: 'Duração abaixo do desejado', icon: '⏱️' },
    { id: 'performance', title: 'Baixa Performance', sub: 'Falta de vigor e energia', icon: '🪨' },
    { id: 'libido', title: 'Falta de Vontade', sub: 'Baixa disposição ou desejo', icon: '🧬' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProblem) onComplete();
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans p-6 flex flex-col items-center">
      <div className="bg-red-600 py-2 px-4 text-center fixed top-0 left-0 right-0 z-40 shadow-sm border-b border-red-700">
        <p className="text-[10px] md:text-xs font-black tracking-widest uppercase text-white flex items-center justify-center gap-2">
          <span>🚨</span> PERSONALIZAÇÃO EXCLUSIVA LIBERADA <span>🚨</span>
        </p>
      </div>

      <div className="max-w-md w-full pt-16 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-2 text-zinc-900 tracking-tighter">
            RECEITA DO <span className="text-green-600 italic">BICARBONATO</span>
          </h1>
          <p className="text-zinc-500 font-bold text-xs md:text-sm uppercase tracking-widest opacity-80">
            Ajustaremos as doses para o seu caso específico.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-zinc-100">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Sua Idade</label>
              <input 
                type="number" 
                placeholder="Ex: 35" 
                className="w-full bg-zinc-50 border-2 border-zinc-50 p-4 rounded-2xl text-center font-black text-zinc-800 placeholder:text-zinc-200 focus:border-green-600 focus:bg-white transition-all outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Peso (KG)</label>
              <input 
                type="number" 
                placeholder="Ex: 80" 
                className="w-full bg-zinc-50 border-2 border-zinc-50 p-4 rounded-2xl text-center font-black text-zinc-800 placeholder:text-zinc-200 focus:border-green-600 focus:bg-white transition-all outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-3 mb-10">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block ml-2">
              QUAL É SEU DESAFIO ATUAL?
            </label>
            {problems.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProblem(p.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-3xl border-2 transition-all text-left group ${
                  selectedProblem === p.id 
                  ? 'border-green-600 bg-green-50 scale-[1.02] shadow-sm' 
                  : 'border-zinc-50 bg-zinc-50 hover:border-zinc-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-colors ${
                  selectedProblem === p.id ? 'bg-green-600 text-white' : 'bg-white shadow-sm'
                }`}>
                  {p.icon}
                </div>
                <div>
                  <p className="font-black text-zinc-900 text-sm md:text-base leading-none mb-1">{p.title}</p>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">{p.sub}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!selectedProblem}
            className={`w-full py-6 rounded-3xl font-black uppercase tracking-tight text-lg transition-all leading-tight ${
              selectedProblem 
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg active:scale-95 animate-pulse-custom' 
              : 'bg-zinc-100 text-zinc-300 cursor-not-allowed'
            }`}
          >
            GERAR MEU PLANO<br/>PERSONALIZADO AGORA
          </button>
        </form>

        <div className="mt-8 text-center opacity-40">
           <p className="text-[9px] uppercase font-black text-zinc-400 tracking-widest">Protocolo Seguro & Discreto</p>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
