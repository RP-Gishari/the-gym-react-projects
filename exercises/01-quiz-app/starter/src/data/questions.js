export const questions = [
  {
    id: 1,
    question: 'What does JSX stand for?',
    options: [
      'JavaScript XML', 
      'JavaScript Extension',
      'JSON Syntax Exchange',
      'Java Syntax XML',
    ],
    correct: 0,
  },
  {
    id: 2,
    question: 'Which of the following correctly passes a prop called "title" to a component?',
    options: [
      '<Card title="Hello" />',
      '<Card title=Hello />',
      '<Card "title"="Hello" />',
      '<Card props.title="Hello" />',
    ],
    correct: 0,
  },
  {
    id: 3,
    question: 'What is the correct way to embed a JavaScript expression inside JSX?',
    options: [
      '{{ expression }}',
      '( expression )',
      '{ expression }',
      '<!-- expression -->',
    ],
    correct: 2,
  },
  {
    id: 4,
    question: 'Which hook gives a component memory between renders?',
    options: ['useEffect', 'useRef', 'useState', 'useMemo'],
    correct: 2,
  },
  {
    id: 5,
    question: 'What happens when you call the setter function returned by useState?',
    options: [
      'The variable updates immediately in the current render',
      'React schedules a re-render with the new value',
      'The page reloads',
      'Nothing — you must also call forceUpdate()',
    ],
    correct: 1,
  },
  {
    id: 6,
    question: 'Which of these correctly attaches a click handler in React?',
    options: [
      '<button onclick={handleClick}>',
      '<button onClick={handleClick()}>',
      '<button onClick={handleClick}>',
      '<button onClick="handleClick()">',
    ],
    correct: 2,
  },
  {
    id: 7,
    question: 'What must every item in a rendered list have in React?',
    options: [
      'A unique className',
      'A unique key prop',
      'An id attribute',
      'A ref prop',
    ],
    correct: 1,
  },
  {
    id: 8,
    question: 'Which of the following is a controlled input?',
    options: [
      '<input defaultValue={name} />',
      '<input value={name} onChange={e => setName(e.target.value)} />',
      '<input value={name} />',
      '<input onChange={e => setName(e.target.value)} />',
    ],
    correct: 1,
  },
  {
    id: 9,
    question: 'What does the second argument to useEffect control?',
    options: [
      'How many times the effect can run',
      'Which state variables are updated by the effect',
      'When the effect re-runs (the dependency array)',
      'The return value of the effect',
    ],
    correct: 2,
  },
  {
    id: 10,
    question: 'When a parent re-renders, what happens to its child components by default?',
    options: [
      'Nothing — children only re-render when their own state changes',
      'They also re-render',
      'They are unmounted and remounted',
      'React asks the user before re-rendering them',
    ],
    correct: 1,
  },
]
