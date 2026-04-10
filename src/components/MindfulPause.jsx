function MindfulPause({ show }) {
  if (!show) return null

  return (
    <div className="mindful-pause-toast">
      <span>🌸</span>
      <p>Taking a breath? Your presence matters more than your scroll.</p>
    </div>
  )
}

export default MindfulPause
