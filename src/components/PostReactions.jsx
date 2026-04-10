import { useState } from 'react'

const compassionReactions = [
  { emoji: '🙏', name: 'Gratitude', key: 'gratitude' },
  { emoji: '💙', name: 'Support', key: 'support' },
  { emoji: '💭', name: 'Reflecting', key: 'reflecting' },
  { emoji: '🤝', name: 'Dialogue', key: 'dialogue' },
  { emoji: '🌿', name: 'Wellbeing', key: 'wellbeing' }
]

function PostReactions({ reactions, onReaction }) {
  return (
    <div className="post-reactions">
      <div className="reaction-buttons">
        {compassionReactions.map((reaction) => (
          <button
            key={reaction.key}
            className="reaction-btn"
            onClick={() => onReaction && onReaction(reaction.key)}
            title={reaction.name}
          >
            {reaction.emoji} {reactions?.[reaction.key] || 0}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PostReactions
