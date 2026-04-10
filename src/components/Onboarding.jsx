import OnboardingStep1 from './OnboardingStep1'
import OnboardingStep2 from './OnboardingStep2'
import OnboardingStep3 from './OnboardingStep3'

function Onboarding({ show, currentStep, answers, onAnswer, onNext, onSkip, onComplete }) {
  if (!show) return null

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal card">
        {currentStep === 0 && (
          <OnboardingStep1 
            answers={answers} 
            onAnswer={onAnswer}
            onNext={onNext}
            onSkip={onSkip}
          />
        )}
        {currentStep === 1 && (
          <OnboardingStep2 
            answers={answers} 
            onAnswer={onAnswer}
            onNext={onNext}
            onSkip={onSkip}
          />
        )}
        {currentStep === 2 && (
          <OnboardingStep3 
            answers={answers} 
            onAnswer={onAnswer}
            onComplete={onComplete}
            onSkip={onSkip}
          />
        )}
      </div>
    </div>
  )
}

export default Onboarding
