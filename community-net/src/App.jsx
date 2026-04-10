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

function App() {
  const [currentView, setCurrentView] = useState('feed')
  const [showIntentionPrompt, setShowIntentionPrompt] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')
  const [postIntention, setPostIntention] = useState('')
  const [scrollTime, setScrollTime] = useState(0)
  const [showMindfulPause, setShowMindfulPause] = useState(false)
  const [posts, setPosts] = useState(mockPosts)

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
  }

  const handleReaction = (postId, reactionKey) => {
    // In a real app, this would update the backend
    console.log(`Reacted with ${reactionKey} to post ${postId}`)
  }

  const renderHeader = () => (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🌐</span>
          <h1>Community Net</h1>
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
          onClick={() => setShowIntentionPrompt(true)}
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
        <button className="btn btn-secondary btn-sm">
          💭 Reflect & Respond
        </button>
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
      <div className="posts-list">
        {posts.map(renderPost)}
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

      {showIntentionPrompt && renderIntentionPrompt()}
      {showMindfulPause && renderMindfulPause()}

      <footer className="app-footer">
        <p className="text-muted text-center">
          Community Net — Designed with karma, compassion, and inclusive equality
        </p>
      </footer>
    </div>
  )
}

export default App
