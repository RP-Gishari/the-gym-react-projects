// INSTRUCTOR ONLY — do not distribute until after class debrief.

function StatCard({ name, position, score, avatarUrl }) {
  return (
    <div className="stat-card">
      <img
        src={avatarUrl}
        alt={name}
        className="avatar"
      />
      <h2>{name}</h2>
      <p className="position">{position}</p>
      <div className="score-badge">{score}</div>
    </div>
  )
}

export default StatCard
