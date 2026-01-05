
import React, { useState } from 'react';

interface QuizFormProps {
  onComplete: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ onComplete }) => {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  const problems = [
    { id: 'broxada', title: 'Broxada', sub: 'Não subir ou cair no meio do ato', icon: '🔥' },
    { id: 'gozo', title: 'Gozo Rápido', sub: 'Ejacular em 1-3 minutos', icon: '⏱️' },
    { id: 'meia-bomba', title: 'Pau Meia-Bomba', sub: 'Falta de firmeza/rigidez', icon: '🪨' },
    { id: 'tesao', title: 'Não Tenho Tesão', sub: 'Falta de vontade/disposição', icon: '🐂' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProblem) onComplete();
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans p-6 flex flex-col items-center">
      <div className="max-w-md w-full pt-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-black text-[#003d29] uppercase tracking-tight">
            PERSONALIZE SEU PLANO
          </h1>
          <p className="text-zinc-500 font-medium text-sm md:text-base mt-2">
            Ajustaremos as doses para o seu caso específico.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-zinc-200/50 border border-zinc-100">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Idade</label>
              <input 
                type="number" 
                placeholder="Ex: 35" 
                className="w-full bg-zinc-50 border-none p-4 rounded-2xl text-center font-bold text-zinc-800 placeholder:text-zinc-300 focus:ring-2 focus:ring-[#003d29]/20 transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Peso (KG)</label>
              <input 
                type="number" 
                placeholder="Ex: 80" 
                className="w-full bg-zinc-50 border-none p-4 rounded-2xl text-center font-bold text-zinc-800 placeholder:text-zinc-300 focus:ring-2 focus:ring-[#003d29]/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-3 mb-10">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">
              3. QUAL SEU PROBLEMA PRINCIPAL?
            </label>
            {problems.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProblem(p.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-3xl border-2 transition-all text-left ${
                  selectedProblem === p.id 
                  ? 'border-[#003d29] bg-[#003d29]/5 scale-[1.02]' 
                  : 'border-zinc-50 bg-white hover:border-zinc-200'
                }`}
              >
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                  {p.icon}
                </div>
                <div>
                  <p className="font-black text-zinc-800 text-sm md:text-base">{p.title}</p>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase">{p.sub}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!selectedProblem}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-tight text-lg transition-all ${
              selectedProblem 
              ? 'bg-[#003d29] text-white shadow-lg shadow-[#003d29]/20 active:scale-95' 
              : 'bg-zinc-100 text-zinc-300 cursor-not-allowed'
            }`}
          >
            Ver Meu Plano Personalizado
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
