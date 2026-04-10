function OnboardingStep3({ answers, onAnswer, onComplete, onSkip }) {
  return (
    <div className="onboarding-step">
      <h2>Inclusivity Pledge</h2>
      <p className="onboarding-subtitle">Respecting diverse paths and perspectives</p>
      
      <div className="inclusivity-pledge-text">
        <p>"I respect that others walk different spiritual paths.</p>
        <p>I will not mock, proselytize, or exclude based on belief."</p>
      </div>
      
      <label className="checkbox-label">
        <input 
          type="checkbox"
          checked={answers.inclusivityPledge || false}
          onChange={(e) => onAnswer && onAnswer('inclusivityPledge', e.target.checked)}
        />
        <span>I pledge to honor this commitment</span>
      </label>
      
      <div className="onboarding-actions">
        <button className="btn btn-secondary" onClick={onSkip}>Skip</button>
        <button className="btn btn-primary" onClick={onComplete}>Begin Mindfully</button>
      </div>
    </div>
  )
}

export default OnboardingStep3
