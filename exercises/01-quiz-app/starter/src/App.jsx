import { useState } from 'react'
import { questions } from './data/questions'


export default function App() {

  const [answers, setAnswers]= useState(null)// checks whether the answer is correct or not 
  const [currentIndex, setCurrentIndex] = useState(0)// tracks the change in the index of questions
  const question = questions[currentIndex] // display the number of the question on the page
  const [score,setScore]= useState(0) // tracks the number of questions the user has answered correctly.


function handleAnswers(i){
if(answers !== null)return 
setAnswers(i)
if(i===question.correct)//Handles the incrementation of scores when the answer is correct
   setScore(score + 1 )
  }

  function handleCurrentIndex(){//changes the question index as we move on to the next question
    setAnswers(null)
    setCurrentIndex(prev=> prev + 1)
  }

  function handleRestart(){//Handles the restart button
    setCurrentIndex(prev=>prev=0)
    setScore(0)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {currentIndex !== questions.length &&<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-lg">

        {/* Header */}
        <div  className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-1 mb-8">
          <div
            className="bg-indigo-500 h-1 rounded-full transition-all"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
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
              <button onClick={()=>handleAnswers(i)}
                className={
                  `w-full text-left rounded-lg px-4 py-3 text-sm border transition-colors
                  ${answers === null? " border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 ": i===question.correct? "border-green-600 text-green-600": i===answers? "border-red-600 text-red-600":" border-slate-200 text-slate-700  hover:border-indigo-400 hover:shadow-lg"}`
                }
              >
                {option}
              </button>
            </li>
          ))}
        </ul>

        {/* Next button — hidden until an answer is selected */}
        <button  onClick={handleCurrentIndex} className={ 
          `w-full transition-colors 
         ${answers === null?"hidden":"bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700"} `
          }
          >
          Next →
        </button>
        </div>
      }
      

        {/* Final page- shows the total score gained and restart chance*/}

        {/* Header */}
         {currentIndex === questions.length && 
         <div>
        <div  className="text-lg text-black ">
          <span className="font-bold">Quiz complete🎉</span>
          <br/>
          <span>Your score: {score}/{questions.length}</span>
        </div>

       
        {/* Restart button */}
        <button  onClick={handleRestart} className={ 
          "w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700"
          }
          >
          Restart
        </button>
        </div>}
      

      </div>
    
  )
}


