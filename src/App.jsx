import { useState, useEffect } from 'react'
import './App.css'

// Components
import Header from './components/Header'
import Onboarding from './components/Onboarding'
import IntentionPrompt from './components/IntentionPrompt'
import MindfulPause from './components/MindfulPause'
import PostComposer from './components/PostComposer'
import WisdomFilters from './components/WisdomFilters'
import Post from './components/Post'
import DialogueSpace from './components/DialogueSpace'

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

const mockDialogueMessages = [
  { id: 1, author: 'Alex', content: 'What does mindfulness mean to you?', timestamp: '10 min ago' },
  { id: 2, author: 'Jordan', content: 'To me, it\'s about being present without judgment.', timestamp: '8 min ago' }
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

  const handleOnboardingAnswer = (field, value) => {
    setOnboardingAnswers({...onboardingAnswers, [field]: value})
  }

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

  return (
    <div className="app">
      <Header 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="main-content container">
        {currentView === 'feed' && (
          <div className="feed">
            <PostComposer 
              content={newPostContent}
              onContentChange={setNewPostContent}
              onPost={() => {
                if (!newPostContent.trim()) return
                handlePostSubmit()
              }}
              onSetIntention={handlePostClick}
            />
            <WisdomFilters 
              activeFilters={activeWisdomFilters}
              onToggleFilter={toggleWisdomFilter}
            />
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
            <div className="posts-list">
              {filteredPosts.map(post => (
                <Post 
                  key={post.id}
                  post={post}
                  onReaction={handleReaction}
                  onPrivateAck={handlePrivateAcknowledgment}
                  onFeedback={handleConstructiveFeedback}
                />
              ))}
            </div>
          </div>
        )}
        {currentView === 'dialogue' && (
          <DialogueSpace 
            messages={mockDialogueMessages}
            onPost={(content) => console.log('Posted:', content)}
          />
        )}
        {currentView === 'profile' && (
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
        )}
      </main>

      <Onboarding 
        show={showOnboarding}
        currentStep={onboardingStep}
        answers={onboardingAnswers}
        onAnswer={handleOnboardingAnswer}
        onNext={() => setOnboardingStep(prev => prev + 1)}
        onSkip={() => {
          if (onboardingStep < 2) {
            setOnboardingStep(prev => prev + 1)
          } else {
            setShowOnboarding(false)
          }
        }}
        onComplete={() => setShowOnboarding(false)}
      />
      
      {showIntentionPrompt && (
        <IntentionPrompt 
          selectedIntention={postIntention}
          onSelect={setPostIntention}
          onConfirm={handlePostSubmit}
          onCancel={() => setShowIntentionPrompt(false)}
        />
      )}
      
      <MindfulPause show={showMindfulPause} />
      
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
                <label>Suggest a question that could deepen understanding</label>
                <textarea placeholder="I'm curious about..." rows={2} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setSelectedPostForFeedback(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                console.log('Feedback submitted')
                setSelectedPostForFeedback(null)
              }}>Submit Feedback</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
