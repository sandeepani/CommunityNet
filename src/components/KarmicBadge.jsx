import { useState } from 'react'

const badgeIcons = {
  kindness: '🌱',
  dialogue: '💬',
  review: '⚠️'
}

function KarmicBadge({ badge }) {
  if (!badge) return null
  
  return (
    <div className={`karmic-badge badge-${badge.type}`}>
      <span>{badgeIcons[badge.type]}</span>
      <span>{badge.label}</span>
    </div>
  )
}

export default KarmicBadge
