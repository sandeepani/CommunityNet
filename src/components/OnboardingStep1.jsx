import { useState } from 'react'

const purposeOptions = [
  { label: 'To connect with others', value: 'To connect', icon: '🤝' },
  { label: 'To learn and grow', value: 'To learn', icon: '📚' },
  { label: 'To share kindness', value: 'To share kindness', icon: '💙' },
  { label: 'To listen deeply', value: 'To listen', icon: '👂' }
]

function OnboardingStep1({ answers, onAnswer, onNext, onSkip }) {
  return (
    <div className="onboarding-step">
      <h2>Welcome to Clearing Ripple</h2>
      <p className="onboarding-subtitle">A mindful social space designed with karma, compassion, and inclusive equality</p>
      
      <h3>Reflect on Your Purpose</h3>
      <p className="prompt-question">Why are you here?</p>
      
      <div className="purpose-options">
        {purposeOptions.map((option) => (
          <button 
            key={option.value}
            className={`purpose-option ${answers.purpose === option.value ? 'selected' : ''}`}
            onClick={() => onAnswer && onAnswer('purpose', option.value)}
          >
            {option.icon} {option.label}
          </button>
        ))}
      </div>
      
      <div className="onboarding-actions">
        <button className="btn btn-secondary" onClick={onSkip}>Skip</button>
        <button className="btn btn-primary" onClick={onNext}>Continue</button>
      </div>
    </div>
  )
}

export default OnboardingStep1
