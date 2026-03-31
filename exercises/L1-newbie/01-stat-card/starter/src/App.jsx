// Do not modify this file.
import StatCard from './StatCard'

const player = {
  name: 'Aria Voss',
  position: 'Midfielder',
  score: 92,
  avatarUrl: 'https://i.pravatar.cc/100?img=5',
}

export default function App() {
  return (
    <StatCard
      name={player.name}
      position={player.position}
      score={player.score}
      avatarUrl={player.avatarUrl}
    />
  )
}
