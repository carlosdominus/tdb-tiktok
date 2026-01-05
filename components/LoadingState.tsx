
import React, { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const LoadingState: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Analisando seu perfil...');

  useEffect(() => {
    const messages = [
      'Analisando seu perfil...',
      'Calculando doses ideais...',
      'Cruzando dados científicos...',
      'Ajustando bônus exclusivos...',
      'Finalizando seu plano!',
    ];

    let currentMsg = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        const nextProgress = prev + (100 / (messages.length * 10));
        const msgIndex = Math.floor((nextProgress / 100) * messages.length);
        if (msgIndex < messages.length && msgIndex !== currentMsg) {
          currentMsg = msgIndex;
          setText(messages[msgIndex]);
        }
        return nextProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xs w-full">
        <div className="mb-8 relative flex justify-center">
           <div className="w-24 h-24 border-4 border-zinc-100 border-t-[#003d29] rounded-full animate-spin"></div>
           <div className="absolute inset-0 flex items-center justify-center font-black text-[#003d29]">
             {Math.round(progress)}%
           </div>
        </div>
        
        <h2 className="text-xl font-black text-zinc-800 uppercase tracking-tight mb-2">
          {text}
        </h2>
        <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#003d29] h-full transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-4 text-[10px] text-zinc-400 font-black uppercase tracking-widest">
          Não feche esta página
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
