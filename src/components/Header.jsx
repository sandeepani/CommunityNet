function Header({ currentView, onViewChange }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🌐</span>
          <h1>Clearing Ripple</h1>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-btn ${currentView === 'feed' ? 'active' : ''}`}
            onClick={() => onViewChange && onViewChange('feed')}
          >
            Feed
          </button>
          <button 
            className={`nav-btn ${currentView === 'dialogue' ? 'active' : ''}`}
            onClick={() => onViewChange && onViewChange('dialogue')}
          >
            Dialogue
          </button>
          <button 
            className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`}
            onClick={() => onViewChange && onViewChange('profile')}
          >
            Profile
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
