import KarmicBadge from './KarmicBadge'
import PostReactions from './PostReactions'

function Post({ post, onReaction, onPrivateAck, onFeedback }) {
  return (
    <article className="post card">
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

      <KarmicBadge badge={post.karmicBadge} />

      <PostReactions reactions={post.reactions} onReaction={(key) => onReaction && onReaction(post.id, key)} />

      <div className="post-actions">
        <button 
          className="action-btn"
          onClick={() => onPrivateAck && onPrivateAck(post.id, post.author)}
        >
          🙏 Private Acknowledgment
        </button>
        <button 
          className="action-btn"
          onClick={() => onFeedback && onFeedback(post.id)}
        >
          💬 Constructive Feedback
        </button>
      </div>
    </article>
  )
}

export default Post
