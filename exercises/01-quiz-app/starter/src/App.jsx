import React from 'react'
import { questions } from './data/questions'



export default function App() {

// This state tracks the current index we're using this to access questions
 
const [currentIndex , setCurrentIndex] = React.useState(0)

// This states tracks the selected index of in options 
// I chose this in order to know the index selected by user so
// that i can compare it with the correct answer in order to take descion on 
// whether the selected option is correct or wrong 
// I chose this inorder to prevent user to select more than one option 

const [selectedIndex, setSelectedIndex] = React.useState(null)

//This state track the user scores 
const [score , setScore] = React.useState(0)


const question = questions[currentIndex] || {}



function handleSelectedIndex(index){
if (selectedIndex !== null) return;
 setSelectedIndex(index)
if(index === question.correct) 
  setScore(score + 1)
   
 }

 

function handlerCurrIndex(){
setSelectedIndex(null)
setCurrentIndex(prev => prev + 1)

}


//This function handles color and border changes according the selected option

function handleColor(i) {
  if (selectedIndex === null) return ''
  if (i === question.correct) return 'green'
  if (i === selectedIndex) return 'red'

  return ''
}


function handleRestart(){
setCurrentIndex(0)
setScore(0)
setSelectedIndex(null)
}


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    {currentIndex !== questions.length && <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-lg">

        {/* Header */}
         <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span >Score: {score}</span>
        </div> 

        {/* Progress bar  */}
         <div className="w-full bg-slate-100 rounded-full h-1 mb-8">
          <div
            className="bg-indigo-500 h-1 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
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

              style={{color: handleColor(i), borderColor:handleColor(i)}}
              
              onClick={()=>handleSelectedIndex(i)}

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

     { currentIndex === questions.length && <div> <h3 className='font-bold'>Quiz complete 🎉</h3> <div className=' mt-3.5 '>Your score : {score} /{questions.length}</div>

     <button className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors mt-10" onClick={handleRestart}>Restart </button>
    
    </div>} 

    </div>

    
  )
}




