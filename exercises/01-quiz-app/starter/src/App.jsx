import { questions } from './data/questions'
import { useState } from 'react'

// The UI below is complete and styled — run npm run dev to see it.
// Your job: make it interactive using React.
// Nothing here is wired up — no state, no handlers, no logic.
// Do not change the className values. Focus on React.

export default function App() {
  // hardcoded for display — you will replace these with state
  const [index, setIndex] = useState(0) // tracks current question index
  const [selectedAnswered, setSelectedAnswered] = useState(null) // stores selected option index
  const [answered, setAnswered] = useState(false) // This prevent multiple answers for the same question
  const [score, setScore] = useState(0) // track the user score
  const [showResult, setShowResult] = useState(false)// show the final result

const question = questions[index] // Get current question based on index

// handle selecting an answered
const handleSelect = (i) =>{
   if(answered) return
   setSelectedAnswered(i)
   setAnswered(true)
   if( i === question.correct){
    setScore((prev) => prev + 1)
   }
}

// help to move to the next question or show result if last question
const handleNextClick = () =>{
  if(index + 1 < questions.length){
    setAnswered(false)
    setSelectedAnswered(null)
    setIndex( index + 1)
  }else{
    setShowResult(true)
  }}

  // Reset entire quiz state
    const handleReset = () =>{
    setIndex(0)
    setSelectedAnswered(null)
    setAnswered(false)
    setScore(0)
    setShowResult(false)
  }

  // Render result screen when quiz is finished
  if(showResult){
    // change result color based on performance
    let styles = "border-grey-200"
    if(score >= 5){
      styles = "bg-green-500"
    }else{
      styles = "bg-red-500"
    }
      return(
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-centet">
            <h1 className="text-2xl text-blue-500 font-bold mb-4">Final Score: {score} out of {questions.length}</h1>
            <button onClick={handleReset} className={`text-white text-2xl font-bold text-center bg-blue-500 px-4 py-2 rounded ${styles}`}>Play Again</button>
          </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-lg">

        {/* Header */}
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Question {index + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-1 mb-8">
          <div
            className="bg-indigo-500 h-1 rounded-full transition-all"
            style={{ width: `${((index) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <h2 className="text-base font-semibold text-slate-800 mb-6 leading-snug">
          {question.question}
        </h2>

        {/* Options */}
        <ul className="space-y-2 mb-8">
          {question.options.map((option, i) => {
            let styles = "border-grey-100"
            if(answered){
              if( i === question.correct){
                 styles = "bg-green-300"
              }else if(i === selectedAnswered){
              styles = "bg-red-300"
            }}

            return (
            <li key={i}>
              <button onClick={() => handleSelect(i)}
                className={`w-full text-left rounded-lg px-4 py-3 text-sm border border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 transition-colors ${styles}`}
              >
                {option}
              </button>
            </li>
          )})}
        </ul>

        {/* Next button — hidden until an answer is selected */}
        {answered &&(<button onClick={handleNextClick} className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
          Next →
        </button>
        )}
      </div>
    </div>
  )
}