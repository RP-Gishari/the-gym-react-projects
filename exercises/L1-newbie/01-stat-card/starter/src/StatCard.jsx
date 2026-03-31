// Your job: replace every PLACEHOLDER with the correct prop value.
// Do not change anything outside the TODO blocks.

function StatCard({ name, position, score, avatarUrl }) {
  return (
    <div className="stat-card">
      <img
        src={avatarUrl}
        // TODO: Replace "PLACEHOLDER" with {name}
        alt="PLACEHOLDER"
        className="avatar"
      />
      <h2>
        {/* TODO: Replace PLACEHOLDER with {name} */}
        PLACEHOLDER
      </h2>
      <p className="position">
        {/* TODO: Replace PLACEHOLDER with {position} */}
        PLACEHOLDER
      </p>
      <div className="score-badge">
        {/* TODO: Replace PLACEHOLDER with {score} */}
        PLACEHOLDER
      </div>
    </div>
  )
}

export default StatCard
