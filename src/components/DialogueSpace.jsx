function DialogueSpace({ messages, onPost }) {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!content.trim()) return
    onPost && onPost(content)
    setContent('')
  }

  return (
    <div className="dialogue-space card">
      <h2>Dialogue Space</h2>
      <div className="dialogue-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="dialogue-message">
            <p>{msg.content}</p>
            <span className="message-meta">{msg.author} • {msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="dialogue-prompt">
        <textarea
          placeholder="Share your thoughts or ask a question..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
        <button 
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!content.trim()}
        >
          Post Response
        </button>
      </div>
    </div>
  )
}

export default DialogueSpace
