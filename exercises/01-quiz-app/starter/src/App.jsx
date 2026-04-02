import { questions } from './data/questions'
import { useState } from 'react'

// The UI below is complete and styled — run npm run dev to see it.
// Your job: make it interactive using React.
// Nothing here is wired up — no state, no handlers, no logic.
// Do not change the className values. Focus on React.

export default function App() {
  // hardcoded for display — you will replace these with state
  const [index, setIndex] = useState(0)
  const [selectedAnswered, setSelectedAnswered] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)

const question = questions[index]
//console.log(question)

const handleSelect = (i) =>{
   if(answered) return
   setSelectedAnswered(i)
   setAnswered(true)
   if( i === question.correct){
    setScore((prev) => prev + 1)
   }
}

const handleNextClick = () =>{
    setAnswered(false)
    setSelectedAnswered(null)
    setIndex( index + 1)
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