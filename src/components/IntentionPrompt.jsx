import { useState } from 'react'

const intentionOptions = [
  { name: 'Constructive Dialogue', icon: '💬', key: 'Constructive Dialogue' },
  { name: 'Community Support', icon: '🤝', key: 'Community Support' },
  { name: 'Mindful Reflection', icon: '🧘', key: 'Mindful Reflection' },
  { name: 'Factual Reporting', icon: '📰', key: 'Factual Reporting' }
]

function IntentionPrompt({ selectedIntention, onSelect, onConfirm, onCancel }) {
  return (
    <div className="intention-prompt-overlay" onClick={onCancel}>
      <div className="intention-prompt" onClick={e => e.stopPropagation()}>
        <h3>Before you share...</h3>
        <p className="prompt-question">What is your intention in sharing this?</p>
        <div className="intention-options">
          {intentionOptions.map((option) => (
            <button
              key={option.key}
              className={`intention-option ${selectedIntention === option.key ? 'selected' : ''}`}
              onClick={() => onSelect && onSelect(option.key)}
            >
              {option.icon} {option.name}
            </button>
          ))}
        </div>
        <p className="prompt-secondary">How might it affect others?</p>
        <div className="prompt-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Share Mindfully
          </button>
        </div>
      </div>
    </div>
  )
}

export default IntentionPrompt
