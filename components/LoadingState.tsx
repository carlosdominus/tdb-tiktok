
import React, { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const LoadingState: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Analisando seu perfil...');

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    const messages = [
      'Analisando seu perfil...',
      'Calculando doses ideais...',
      'Cruzando dados científicos...',
      'Ajustando bônus exclusivos...',
      'Finalizando sua receita!',
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
    }, 100);

    return () => {
      clearInterval(interval);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center text-zinc-900">
      <div className="max-w-xs w-full">
        <div className="mb-10 relative flex justify-center">
           <div className="w-28 h-28 border-4 border-zinc-100 border-t-green-600 rounded-full animate-spin"></div>
           <div className="absolute inset-0 flex items-center justify-center font-black text-zinc-900 text-xl">
             {Math.round(progress)}%
           </div>
        </div>
        
        <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter italic mb-4">
          {text}
        </h2>
        
        <div className="w-full bg-zinc-100 h-3 rounded-full overflow-hidden border border-zinc-50">
          <div 
            className="bg-green-600 h-full transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-8 space-y-2">
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.3em] animate-pulse">
              Não feche seu navegador
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
