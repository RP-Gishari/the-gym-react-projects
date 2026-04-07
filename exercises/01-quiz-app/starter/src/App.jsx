import { useState } from 'react'
import { questions } from './data/questions'

// The UI below is complete and styled — run npm run dev to see it.
// Your job: make it interactive using React.
// Nothing here is wired up — no state, no handlers, no logic.
// Do not change the className values. Focus on React.

export default function App() {
  // hardcoded for display — you will replace these with state
  
  const [currentPosition,setCurrentPosition] = useState(0) // for tracking question 
                                                           // order from one position to another
  
  const [selectedResponse, setSelectedResponse] = useState (null) // checking and keep selected response
  const [score, setScore] = useState(0) // tracking and increasing score


  const [isFinished, setIsFinished] = useState(false)// this deal with screen that shows marks after ending the game.
                                                     // gives you ability to play again 
  const question = questions[currentPosition] // this check the index or position of the question
  const isItLast = currentPosition === questions.length -1 //check if the question is the last one



  function CheckNext() {
      
    //  if(selectedResponse === question.correct){
    //   setScore((sco) => sco + 1)
    //  }

     if(isItLast){
      setIsFinished(true)
     

     }else{
      setCurrentPosition(currentPosition + 1)
     setSelectedResponse(null)
     }
     
  }

  function CheckSelected(option, index) {
      if(selectedResponse !== null) return

     setSelectedResponse(option)

     if(index === question.correct){
      setScore((prev) => prev + 1)
     }
  }


  // what will happen if you finish the game.
  if(isFinished){
    return(
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border-slate-200 p-8 w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-4"> Quiz Finished 🎉</h1>

          <p className="text-lg mb-6">
            Your score: {score} / {questions.length}
          </p>

          <button onClick={()=>{
            setCurrentPosition(0)
            setSelectedResponse(null)
            setScore(0)
            setIsFinished(false)
          }} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                Play again
          </button>
        </div>
      </div>
    )
  }

  

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-lg">

        {/* Header */}
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Question {currentPosition + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-1 mb-8">
          <div
            className="bg-indigo-500 h-1 rounded-full transition-all"
            style={{ width: `${((currentPosition + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <h2 className="text-base font-semibold text-slate-800 mb-6 leading-snug">
          {question.question}
        </h2>

        {/* Options */}
        <ul className="space-y-2 mb-8">
          {question.options.map((option, i) => (
            <li key={i}>
              <button 
                       onClick={() => CheckSelected(option, i)}
                       disabled={selectedResponse !== null}

                className={`w-full text-left rounded-lg px-4 py-3 text-sm border 
                  ${selectedResponse !== null
                    ?i === question.correct
                    ? "border-green-500 text-green-500 bg-green-50"
                    : i === question.options.indexOf(selectedResponse)
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-slate-200 text-slate-400"
                    : "border-slate-200 text-slate-700 hover:border-indigo-400 bg-indigo-50"
                  } transition-colors`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>

        {/* Next button — hidden until an answer is selected */}
        {selectedResponse !== null && (
                 <button onClick={CheckNext}
                className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm 
                           font-medium hover:bg-indigo-700 transition-colors">
             {isItLast? "Restart": "Next →"}
        </button>
        )}

      </div>
    </div>
  )
}
