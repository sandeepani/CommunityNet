import { useState } from 'react'

const wisdomFilters = [
  { name: 'Constructive Dialogue', icon: '💬' },
  { name: 'Community Support', icon: '🤝' },
  { name: 'Mindful Reflection', icon: '🧘' },
  { name: 'Factual Reporting', icon: '📰' }
]

function WisdomFilters({ activeFilters, onToggleFilter }) {
  return (
    <div className="wisdom-filters card">
      <h3>Wisdom Filters</h3>
      <div className="filter-buttons">
        {wisdomFilters.map((filter) => (
          <button
            key={filter.name}
            className={`filter-btn ${activeFilters.includes(filter.name) ? 'active' : ''}`}
            onClick={() => onToggleFilter && onToggleFilter(filter.name)}
          >
            {filter.icon} {filter.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default WisdomFilters
