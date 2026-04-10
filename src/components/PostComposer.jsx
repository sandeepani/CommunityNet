import { useState } from 'react'

function PostComposer({ onPost, onSetIntention }) {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!content.trim()) return
    onPost && onPost(content)
    setContent('')
  }

  const handleSetIntention = () => {
    if (!content.trim()) return
    onSetIntention && onSetIntention(content)
  }

  return (
    <div className="post-composer card">
      <div className="composer-header">
        <div className="avatar">YO</div>
        <textarea
          className="composer-input"
          placeholder="What would you like to share with the community?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
      </div>
      <div className="composer-footer">
        <button 
          className="btn btn-secondary"
          onClick={handleSetIntention}
        >
          Set Intention
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!content.trim()}
        >
          Share
        </button>
      </div>
    </div>
  )
}

export default PostComposer
