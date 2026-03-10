import React, { useEffect, useState, useCallback } from 'react'
import Intro from './components/Intro'
import Question from './components/Question'
import decodeHtml from './components/DecodeHtml'
import { SpinnerInfinity } from 'spinners-react'

function App() {
  const [questionData, setQuestionData] = useState([])
  const [allAnswersChecked, setAllAnswersChecked] = useState(false)
  const [answerCount, setAnswerCount] = useState(null)
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!settings.gameStarted) return
    APIcall()
  }, [settings])

  function handleSettings(event) {
    event.preventDefault()
    const set = {
      [event.target[0].name]: parseInt(event.target[0].value),
      [event.target[1].name]: parseInt(event.target[1].value),
      gameStarted: true
    }
    setSettings(set)
    setLoading(true)
  }

  function APIcall() {
    fetch(`https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}`)
      .then(res => res.json())
      .then(data => {
        const dataWithAnswers = data.results.map(questionObject => {
          const correctAnsIndex = Math.floor(Math.random() * (questionObject.incorrect_answers.length + 1))
          let answers = questionObject.incorrect_answers.slice()
          answers.splice(correctAnsIndex, 0, questionObject.correct_answer)
          answers = answers.map(answer => decodeHtml(answer))
          return {
            ...questionObject,
            question: decodeHtml(questionObject.question), // decode once, store decoded
            allAnswers: answers,
            isSelected: '',
            correctAnswerIndex: correctAnsIndex
          }
        })
        setQuestionData(dataWithAnswers)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch questions:', err)
        setLoading(false)
      })
  }

  // Use questionIndex to identify which question was answered — avoids
  // matching on question text which can fail when HTML entities are present
  const handleClick = useCallback((questionIndex, answerIndex) => {
    setQuestionData(prev => prev.map((q, i) => {
      if (i === questionIndex) {
        return { ...q, isSelected: answerIndex }
      }
      return q
    }))
  }, [])

  function answeredAll(array) {
    return array.length > 0 && array.every(obj => obj.isSelected === 0 ? true : obj.isSelected)
  }

  function checkAnswers() {
    setAllAnswersChecked(true)
    let count = 0
    questionData.forEach(item => {
      if (item.isSelected === item.correctAnswerIndex) count++
    })
    setAnswerCount(count)
  }

  const questionElements = questionData.map((questionObject, index) => (
    <Question
      key={index}
      questionIndex={index}
      question={questionObject.question}
      answers={questionObject.allAnswers}
      handleClick={handleClick}
      selected={questionObject.isSelected}
      allAnswersChecked={allAnswersChecked}
      correctAnswerIndex={questionObject.correctAnswerIndex}
    />
  ))

  return (
    <main>
      {loading
        ? <SpinnerInfinity enabled={true} color="#4D5B9E" secondaryColor="#ababab" />
        : <>
            {settings.gameStarted === true
              ? <div className='quiz'>
                  {questionElements}
                  {answeredAll(questionData) && (
                    <button className='check' onClick={checkAnswers}>Check Answers</button>
                  )}
                  {allAnswersChecked && (
                    <h3>{`Score: ${answerCount} / ${questionData.length} (${Math.round((answerCount / questionData.length) * 100)}%)`}</h3>
                  )}
                </div>
              : <Intro handleFormData={handleSettings} />}
          </>
      }
    </main>
  )
}

export default App
