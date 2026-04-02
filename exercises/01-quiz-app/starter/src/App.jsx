import React from 'react'
import { questions } from './data/questions'

// The UI below is complete and styled — run npm run dev to see it.
// Your job: make it interactive using React.
// Nothing here is wired up — no state, no handlers, no logic.
// Do not change the className values. Focus on React.

export default function App() {
  
const [currIndex , setCurrentIndex] = React.useState(0)
const [selectedIndex, setSelectedIndex] = React.useState(null)
const [score , setScore] = React.useState(0)

console.log(currIndex)

const question = questions[currIndex] 



function handleCorrectAnswer(index){

if (selectedIndex !== null) return;
 setSelectedIndex(index)
if(index === question.correct) 
  setScore(score + 1)
   
 }

 

function handlerCurrIndex(){
setSelectedIndex(null)
setCurrentIndex(prev => prev + 1)

}




function handleColor(i) {
  // no answer selected → default
  if (selectedIndex === null) return 'black'
  // correct answer → green
  if (i === question.correct) return 'green'

  // selected but wrong → red
  if (i === selectedIndex) return 'red'


  return 'black'
}


function handleRestart(){
setCurrentIndex(prev => prev = 0)
setScore(prev => prev = 0)
}


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    {currIndex !== questions.length && <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-lg">

        {/* Header */}
         <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Question {currIndex + 1} of {questions.length}</span>
          <span >Score: {score}</span>
        </div> 

        {/* Progress bar  */}
         <div className="w-full bg-slate-100 rounded-full h-1 mb-8">
          <div
            className="bg-indigo-500 h-1 rounded-full transition-all"
            style={{ width: `${((currIndex) / questions.length) * 100}%` }}
          />
        </div> 

        {/* Question */}
        <h2 className="text-base font-semibold text-slate-800 mb-6 leading-snug">
          {question.question}
        </h2>

        {/* Options */}
        <ul className="space-y-2 mb-8">
          {question.options.map((option, i) => (
            <li key={i}
             
            >
               <button  
                className="w-full text-left rounded-lg px-4 py-3 text-sm border border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"

              style={{color : handleColor(i)}}
              onClick={()=>handleCorrectAnswer(i)}

              >
                {option}
              </button> 
            </li>
          ))}
        </ul>

        {/* Next button — hidden until an answer is selected */}
 { selectedIndex !== null && <button onClick={handlerCurrIndex} className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
          Next →
        </button> }

        

      </div>}

     { currIndex === questions.length && <div> <h3 className='font-bold'>Quiz complete 🎉</h3> <div className=' mt-3.5 '>Your score : {score} /{questions.length}</div>

     <button className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors mt-10" onClick={handleRestart}>Restart </button>
    
    </div>} 

    </div>

    
  )
}
