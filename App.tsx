
import React, { useState } from 'react';
import { COMMON_DATA } from './constants';
import QuizForm from './components/QuizForm';
import LoadingState from './components/LoadingState';
import VariationHighUrgency from './components/VariationHighUrgency';

type AppStep = 'QUIZ' | 'LOADING' | 'OFFER';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('QUIZ');

  const handleQuizComplete = () => {
    setStep('LOADING');
  };

  const handleLoadingComplete = () => {
    setStep('OFFER');
  };

  return (
    <div className="relative">
      {step === 'QUIZ' && <QuizForm onComplete={handleQuizComplete} />}
      {step === 'LOADING' && <LoadingState onComplete={handleLoadingComplete} />}
      {step === 'OFFER' && <VariationHighUrgency data={COMMON_DATA} />}
    </div>
  );
};

export default App;
