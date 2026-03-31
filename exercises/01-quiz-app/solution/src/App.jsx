// INSTRUCTOR ONLY — do not share until after debrief.
import { useState } from 'react'
import { questions } from './data/questions'

// State lives in App because all child views (quiz screen, results screen)
// need access to the same quiz progress.
export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const question = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1

  function handleAnswer(index) {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    if (index === question.correct) {
      setScore(s => s + 1)
    }
  }

  function handleNext() {
    if (isLast) {
      setIsFinished(true)
    } else {
      setCurrentIndex(i => i + 1)
      setSelectedAnswer(null)
    }
  }

  function handleRestart() {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setIsFinished(false)
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">{percentage >= 70 ? '🎉' : '📚'}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
          <p className="text-gray-500 mb-6">
            You scored <span className="font-bold text-indigo-600">{score}</span> out of{' '}
            <span className="font-bold">{questions.length}</span> ({percentage}%)
          </p>
          <button
            onClick={handleRestart}
            className="bg-indigo-600 text-white rounded-lg px-6 py-2.5 font-medium hover:bg-indigo-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-xl w-full">
        <div className="flex justify-between items-center mb-6 text-sm text-gray-400">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="font-medium text-indigo-600">Score: {score}</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8">
          <div
            className="bg-indigo-600 h-1.5 rounded-full transition-all"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-6 leading-snug">
          {question.question}
        </h2>

        <ul className="space-y-3 mb-8">
          {question.options.map((option, i) => {
            let style = 'border border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50'
            if (selectedAnswer !== null) {
              if (i === question.correct) style = 'border-2 border-green-500 bg-green-50 text-green-800'
              else if (i === selectedAnswer) style = 'border-2 border-red-400 bg-red-50 text-red-700'
              else style = 'border border-gray-100 text-gray-400 cursor-default'
            }
            return (
              <li key={i}>
                <button
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-colors ${style}`}
                  disabled={selectedAnswer !== null && i !== question.correct && i !== selectedAnswer}
                >
                  {option}
                </button>
              </li>
            )
          })}
        </ul>

        {selectedAnswer !== null && (
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 text-white rounded-xl py-3 font-medium hover:bg-indigo-700 transition-colors"
          >
            {isLast ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
