function OnboardingStep2({ answers, onAnswer, onNext, onSkip }) {
  return (
    <div className="onboarding-step">
      <h2>Karmic Agreement</h2>
      <p className="onboarding-subtitle">A voluntary ethical anchor for our community</p>
      
      <div className="karmic-agreement-text">
        <p>"I understand my words and actions here create ripples.</p>
        <p>I commit to speaking truthfully, listening openly,</p>
        <p>and repairing harm if I cause it."</p>
      </div>
      
      <label className="checkbox-label">
        <input 
          type="checkbox"
          checked={answers.karmicAgreement || false}
          onChange={(e) => onAnswer && onAnswer('karmicAgreement', e.target.checked)}
        />
        <span>I agree to this covenant</span>
      </label>
      
      <div className="onboarding-actions">
        <button className="btn btn-secondary" onClick={onSkip}>Skip</button>
        <button className="btn btn-primary" onClick={onNext}>Continue</button>
      </div>
    </div>
  )
}

export default OnboardingStep2
