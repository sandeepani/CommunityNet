import { useState, useEffect } from 'react'
import './App.css'

// Mock data for demonstration
const mockPosts = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: 'SC',
    content: 'Today I planted three trees in my neighborhood. Small actions create ripples. 🌱',
    timestamp: '2 hours ago',
    intentions: ['Community Support'],
    karmicBadge: { type: 'kindness', count: 12, label: 'This post has inspired 12 acts of kindness' },
    reactions: { gratitude: 8, support: 5, reflecting: 2, dialogue: 0, wellbeing: 15 }
  },
  {
    id: 2,
    author: 'Marcus Johnson',
    avatar: 'MJ',
    content: 'I\'ve been struggling with patience lately. Any suggestions on how to practice mindfulness in difficult conversations?',
    timestamp: '4 hours ago',
    intentions: ['Mindful Reflection'],
    karmicBadge: { type: 'dialogue', count: 7, label: 'This discussion led to mutual understanding' },
    reactions: { gratitude: 3, support: 12, reflecting: 8, dialogue: 5, wellbeing: 2 }
  },
  {
    id: 3,
    author: 'Dr. Amira Hassan',
    avatar: 'AH',
    content: 'New research shows that community gardens reduce stress levels by 40% in urban areas. Here\'s a link to the study...',
    timestamp: '6 hours ago',
    intentions: ['Factual Reporting'],
    karmicBadge: null,
    reactions: { gratitude: 15, support: 4, reflecting: 6, dialogue: 3, wellbeing: 8 }
  }
]

const compassionReactions = [
  { emoji: '🙏', name: 'Gratitude', key: 'gratitude' },
  { emoji: '💙', name: 'Support', key: 'support' },
  { emoji: '💭', name: 'Reflecting', key: 'reflecting' },
  { emoji: '🤝', name: 'Dialogue', key: 'dialogue' },
  { emoji: '🌿', name: 'Wellbeing', key: 'wellbeing' }
]

const wisdomFilters = [
  { name: 'Constructive Dialogue', icon: '💬' },
  { name: 'Community Support', icon: '🤝' },
  { name: 'Mindful Reflection', icon: '🧘' },
  { name: 'Factual Reporting', icon: '📰' }
]

function App() {
  const [currentView, setCurrentView] = useState('feed')
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [showIntentionPrompt, setShowIntentionPrompt] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')
  const [postIntention, setPostIntention] = useState('')
  const [scrollTime, setScrollTime] = useState(0)
  const [showMindfulPause, setShowMindfulPause] = useState(false)
  const [posts, setPosts] = useState(mockPosts)
  const [showBreathAnimation, setShowBreathAnimation] = useState(false)
  const [selectedPostForFeedback, setSelectedPostForFeedback] = useState(null)
  const [showPrivateAckModal, setShowPrivateAckModal] = useState(null)
  const [activeWisdomFilters, setActiveWisdomFilters] = useState([])
  const [onboardingAnswers, setOnboardingAnswers] = useState({
    purpose: '',
    karmicAgreement: false,
    inclusivityPledge: false
  })

  // Scroll awareness - gentle pause reminder
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollTime(prev => prev + 1)
      
      // After 10-15 minutes of scrolling, show gentle reminder
      if (scrollTime > 600 && scrollTime % 900 === 0) {
        setShowMindfulPause(true)
        setTimeout(() => setShowMindfulPause(false), 5000)
      }
    }, 1000)

    return () => clearInterval(scrollInterval)
  }, [scrollTime])

  // Handle pre-post breath animation for emotionally charged content
  const handlePostClick = () => {
    // Check if content might be emotionally charged (simple heuristic)
    const emotionalKeywords = ['angry', 'frustrated', 'upset', 'hate', 'disagree']
    const isEmotionallyCharged = emotionalKeywords.some(word => 
      newPostContent.toLowerCase().includes(word)
    )
    
    if (isEmotionallyCharged) {
      setShowBreathAnimation(true)
      // 3-second mindful breath animation
      setTimeout(() => {
        setShowBreathAnimation(false)
        setShowIntentionPrompt(true)
      }, 3000)
    } else {
      setShowIntentionPrompt(true)
    }
  }

  const toggleWisdomFilter = (filterName) => {
    setActiveWisdomFilters(prev => 
      prev.includes(filterName) 
        ? prev.filter(f => f !== filterName)
        : [...prev, filterName]
    )
  }

  const filteredPosts = activeWisdomFilters.length > 0
    ? posts.filter(post => 
        post.intentions.some(intention => activeWisdomFilters.includes(intention))
      )
    : posts

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return
    
    const newPost = {
      id: Date.now(),
      author: 'You',
      avatar: 'YO',
      content: newPostContent,
      timestamp: 'Just now',
      intentions: postIntention ? [postIntention] : [],
      karmicBadge: null,
      reactions: { gratitude: 0, support: 0, reflecting: 0, dialogue: 0, wellbeing: 0 }
    }

    setPosts([newPost, ...posts])
    setNewPostContent('')
    setPostIntention('')
    setShowIntentionPrompt(false)
    
    // Show karmic follow-up after posting (simulated)
    setTimeout(() => {
      console.log('Karmic follow-up: Your post was seen by 200 people. 15 replied with gratitude; 3 asked for clarification.')
    }, 2000)
  }

  const handleReaction = (postId, reactionKey) => {
    // In a real app, this would update the backend
    console.log(`Reacted with ${reactionKey} to post ${postId}`)
  }

  const handlePrivateAcknowledgment = (postId, author) => {
    setShowPrivateAckModal({ postId, author })
  }

  const handleConstructiveFeedback = (postId) => {
    setSelectedPostForFeedback(postId)
  }

  const skipOnboardingStep = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(prev => prev + 1)
    } else {
      setShowOnboarding(false)
    }
  }

  const completeOnboardingStep = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(prev => prev + 1)
    } else {
      setShowOnboarding(false)
    }
  }

  const renderOnboarding = () => {
    if (!showOnboarding) return null

    return (
      <div className="onboarding-overlay">
        <div className="onboarding-modal card">
          {onboardingStep === 0 && (
            <div className="onboarding-step">
              <h2>Welcome to Clearing Ripple</h2>
              <p className="onboarding-subtitle">A mindful social space designed with karma, compassion, and inclusive equality</p>
              
              <h3>Reflect on Your Purpose</h3>
              <p className="prompt-question">Why are you here?</p>
              
              <div className="purpose-options">
                <button 
                  className={`purpose-option ${onboardingAnswers.purpose === 'To connect' ? 'selected' : ''}`}
                  onClick={() => setOnboardingAnswers({...onboardingAnswers, purpose: 'To connect'})}
                >
                  🤝 To connect with others
                </button>
                <button 
                  className={`purpose-option ${onboardingAnswers.purpose === 'To learn' ? 'selected' : ''}`}
                  onClick={() => setOnboardingAnswers({...onboardingAnswers, purpose: 'To learn'})}
                >
                  📚 To learn and grow
                </button>
                <button 
                  className={`purpose-option ${onboardingAnswers.purpose === 'To share kindness' ? 'selected' : ''}`}
                  onClick={() => setOnboardingAnswers({...onboardingAnswers, purpose: 'To share kindness'})}
                >
                  💙 To share kindness
                </button>
                <button 
                  className={`purpose-option ${onboardingAnswers.purpose === 'To listen' ? 'selected' : ''}`}
                  onClick={() => setOnboardingAnswers({...onboardingAnswers, purpose: 'To listen'})}
                >
                  👂 To listen deeply
                </button>
              </div>
              
              <div className="onboarding-actions">
                <button className="btn btn-secondary" onClick={skipOnboardingStep}>Skip</button>
                <button 
                  className="btn btn-primary" 
                  onClick={completeOnboardingStep}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {onboardingStep === 1 && (
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
                  checked={onboardingAnswers.karmicAgreement}
                  onChange={(e) => setOnboardingAnswers({...onboardingAnswers, karmicAgreement: e.target.checked})}
                />
                <span>I agree to this covenant</span>
              </label>
              
              <div className="onboarding-actions">
                <button className="btn btn-secondary" onClick={skipOnboardingStep}>Skip</button>
                <button 
                  className="btn btn-primary" 
                  onClick={completeOnboardingStep}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {onboardingStep === 2 && (
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
                  checked={onboardingAnswers.inclusivityPledge}
                  onChange={(e) => setOnboardingAnswers({...onboardingAnswers, inclusivityPledge: e.target.checked})}
                />
                <span>I pledge to honor this commitment</span>
              </label>
              
              <div className="onboarding-actions">
                <button className="btn btn-secondary" onClick={skipOnboardingStep}>Skip</button>
                <button 
                  className="btn btn-primary" 
                  onClick={completeOnboardingStep}
                >
                  Begin Mindfully
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderHeader = () => (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🌐</span>
          <h1>Clearing Ripple</h1>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-btn ${currentView === 'feed' ? 'active' : ''}`}
            onClick={() => setCurrentView('feed')}
          >
            Feed
          </button>
          <button 
            className={`nav-btn ${currentView === 'dialogue' ? 'active' : ''}`}
            onClick={() => setCurrentView('dialogue')}
          >
            Dialogue
          </button>
          <button 
            className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentView('profile')}
          >
            Profile
          </button>
        </nav>
      </div>
    </header>
  )

  const renderIntentionPrompt = () => (
    <div className="intention-prompt-overlay" onClick={() => setShowIntentionPrompt(false)}>
      <div className="intention-prompt" onClick={e => e.stopPropagation()}>
        <h3>Before you share...</h3>
        <p className="prompt-question">What is your intention in sharing this?</p>
        <div className="intention-options">
          <button 
            className={`intention-option ${postIntention === 'Constructive Dialogue' ? 'selected' : ''}`}
            onClick={() => setPostIntention('Constructive Dialogue')}
          >
            💬 Constructive Dialogue
          </button>
          <button 
            className={`intention-option ${postIntention === 'Community Support' ? 'selected' : ''}`}
            onClick={() => setPostIntention('Community Support')}
          >
            🤝 Community Support
          </button>
          <button 
            className={`intention-option ${postIntention === 'Mindful Reflection' ? 'selected' : ''}`}
            onClick={() => setPostIntention('Mindful Reflection')}
          >
            🧘 Mindful Reflection
          </button>
          <button 
            className={`intention-option ${postIntention === 'Factual Reporting' ? 'selected' : ''}`}
            onClick={() => setPostIntention('Factual Reporting')}
          >
            📰 Factual Reporting
          </button>
        </div>
        <p className="prompt-secondary">How might it affect others?</p>
        <div className="prompt-actions">
          <button className="btn btn-secondary" onClick={() => setShowIntentionPrompt(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handlePostSubmit}>
            Share Mindfully
          </button>
        </div>
      </div>
    </div>
  )

  const renderMindfulPause = () => (
    <div className="mindful-pause-toast">
      <span>🌸</span>
      <p>Taking a breath? Your presence matters more than your scroll.</p>
    </div>
  )

  const renderPostComposer = () => (
    <div className="post-composer card">
      <div className="composer-header">
        <div className="avatar">YO</div>
        <textarea
          className="composer-input"
          placeholder="What would you like to share with the community?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          rows={3}
        />
      </div>
      <div className="composer-footer">
        <button 
          className="btn btn-secondary"
          onClick={handlePostClick}
        >
          Set Intention
        </button>
        <button 
          className="btn btn-primary"
          onClick={showIntentionPrompt ? undefined : handlePostSubmit}
          disabled={!newPostContent.trim()}
        >
          Share
        </button>
      </div>
    </div>
  )

  const renderKarmicBadge = (badge) => {
    if (!badge) return null
    
    const badgeIcons = {
      kindness: '🌱',
      dialogue: '💬',
      review: '⚠️'
    }

    return (
      <div className={`karmic-badge badge-${badge.type}`}>
        <span>{badgeIcons[badge.type]}</span>
        <span>{badge.label}</span>
      </div>
    )
  }

  const renderPost = (post) => (
    <article key={post.id} className="post card">
      <div className="post-header">
        <div className="avatar">{post.avatar}</div>
        <div className="post-meta">
          <h4 className="author-name">{post.author}</h4>
          <span className="timestamp">{post.timestamp}</span>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
        {post.intentions.length > 0 && (
          <div className="intention-tags">
            {post.intentions.map((intention, idx) => (
              <span key={idx} className="intention-tag">{intention}</span>
            ))}
          </div>
        )}
      </div>

      {renderKarmicBadge(post.karmicBadge)}

      <div className="post-reactions">
        <div className="reaction-buttons">
          {compassionReactions.map((reaction) => (
            <button
              key={reaction.key}
              className="reaction-btn"
              onClick={() => handleReaction(post.id, reaction.key)}
              title={reaction.name}
            >
              {reaction.emoji}
              {post.reactions[reaction.key] > 0 && (
                <span className="reaction-count">{post.reactions[reaction.key]}</span>
              )}
            </button>
          ))}
        </div>
        <div className="engagement-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => handlePrivateAcknowledgment(post.id, post.author)}
          >
            💌 Private Thanks
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => handleConstructiveFeedback(post.id)}
          >
            💭 Reflect & Respond
          </button>
        </div>
      </div>
    </article>
  )

  const renderFeed = () => (
    <div className="feed">
      {renderPostComposer()}
      <div className="feed-filters">
        <button className="filter-btn active">Chronological</button>
        <button className="filter-btn">🌱 Wisdom Filter</button>
      </div>
      {activeWisdomFilters.length > 0 && (
        <div className="active-filters">
          <span className="filter-label">Active filters:</span>
          {activeWisdomFilters.map(filter => (
            <button 
              key={filter} 
              className="active-filter-tag"
              onClick={() => toggleWisdomFilter(filter)}
            >
              {filter} ×
            </button>
          ))}
        </div>
      )}
      <div className="wisdom-filters-container">
        {wisdomFilters.map((filter) => (
          <button
            key={filter.name}
            className={`wisdom-filter-btn ${activeWisdomFilters.includes(filter.name) ? 'active' : ''}`}
            onClick={() => toggleWisdomFilter(filter.name)}
          >
            {filter.icon} {filter.name}
          </button>
        ))}
      </div>
      <div className="posts-list">
        {filteredPosts.map(renderPost)}
      </div>
    </div>
  )

  const renderDialogueMode = () => (
    <div className="dialogue-mode card">
      <h2>Dialogue Space</h2>
      <p className="text-muted">A restorative space for thoughtful conversation</p>
      
      <div className="dialogue-guidelines">
        <h3>Guidelines for Dialogue</h3>
        <ul>
          <li>Listen deeply before responding</li>
          <li>Paraphrase what you heard: "What I'm hearing is..."</li>
          <li>Speak from your own experience</li>
          <li>Assume good intentions</li>
        </ul>
      </div>

      <div className="dialogue-example">
        <div className="dialogue-message received">
          <p>I've been feeling overwhelmed by the news lately...</p>
        </div>
        <div className="dialogue-prompt">
          <p className="prompt-text">Before responding, can you share what you heard them say?</p>
          <textarea placeholder="What I hear you saying is..." rows={2} />
          <button className="btn btn-primary" style={{ marginTop: '10px' }}>
            Post Response
          </button>
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="profile card">
      <div className="profile-header">
        <div className="avatar large">YO</div>
        <h2>Your Profile</h2>
      </div>
      
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-number">24</span>
          <span className="stat-label">Acts of Kindness Inspired</span>
        </div>
        <div className="stat">
          <span className="stat-number">8</span>
          <span className="stat-label">Meaningful Dialogues</span>
        </div>
        <div className="stat">
          <span className="stat-number">15</span>
          <span className="stat-label">Days Mindful</span>
        </div>
      </div>

      <div className="karmic-agreement">
        <h3>Your Karmic Agreement</h3>
        <p>"I understand my words and actions here create ripples. I commit to speaking truthfully, listening openly, and repairing harm if I cause it."</p>
      </div>
    </div>
  )

  return (
    <div className="app">
      {renderHeader()}
      
      <main className="main-content container">
        {currentView === 'feed' && renderFeed()}
        {currentView === 'dialogue' && renderDialogueMode()}
        {currentView === 'profile' && renderProfile()}
      </main>

      {showOnboarding && renderOnboarding()}
      {showIntentionPrompt && renderIntentionPrompt()}
      {showMindfulPause && renderMindfulPause()}
      {showBreathAnimation && (
        <div className="breath-animation-overlay">
          <div className="breath-circle"></div>
          <p>Breathe in... Breathe out...</p>
        </div>
      )}
      {showPrivateAckModal && (
        <div className="private-ack-modal-overlay" onClick={() => setShowPrivateAckModal(null)}>
          <div className="private-ack-modal card" onClick={e => e.stopPropagation()}>
            <h3>Send Private Thanks</h3>
            <p>A quiet note of appreciation visible only to {showPrivateAckModal.author}</p>
            <textarea 
              className="private-ack-input"
              placeholder="Write a heartfelt message..."
              rows={4}
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowPrivateAckModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                console.log('Private acknowledgment sent')
                setShowPrivateAckModal(null)
              }}>Send Privately</button>
            </div>
          </div>
        </div>
      )}
      {selectedPostForFeedback && (
        <div className="feedback-modal-overlay" onClick={() => setSelectedPostForFeedback(null)}>
          <div className="feedback-modal card" onClick={e => e.stopPropagation()}>
            <h3>Constructive Feedback</h3>
            <p className="feedback-prompt">Help us understand each other better</p>
            <div className="feedback-sections">
              <div className="feedback-section">
                <label>What part resonates with you?</label>
                <textarea placeholder="Share what you appreciate or understand..." rows={3} />
              </div>
              <div className="feedback-section">
                <label>What concerns you?</label>
                <textarea placeholder="Express your concerns gently..." rows={3} />
              </div>
              <div className="feedback-section">
                <label>How might we understand each other better?</label>
                <textarea placeholder="Suggest ways to bridge our perspectives..." rows={3} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setSelectedPostForFeedback(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                console.log('Constructive feedback submitted')
                setSelectedPostForFeedback(null)
              }}>Share Thoughtfully</button>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p className="text-muted text-center">
          Clearing Ripple — Designed with karma, compassion, and inclusive equality
        </p>
      </footer>
    </div>
  )
}

export default App
