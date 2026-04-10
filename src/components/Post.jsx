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

      <div className="engagement-actions">
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onPrivateAck && onPrivateAck(post.id, post.author)}
        >
          💌 Private Thanks
        </button>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onFeedback && onFeedback(post.id)}
        >
          💭 Reflect & Respond
        </button>
      </div>
    </article>
  )
}

export default Post
