import React from 'react'

export default function Question({
  question,
  questionIndex,
  answers,
  handleClick,
  selected,
  correctAnswerIndex,
  allAnswersChecked
}) {
  const answerElements = answers.map((item, index) => {
    let btnClass = 'answerBtn'
    if (allAnswersChecked) {
      if (index === correctAnswerIndex) {
        btnClass += ' correct'
      } else if (index === selected) {
        btnClass += ' wrong'
      }
    } else {
      if (index === selected) {
        btnClass += ' selected'
      }
    }

    return (
      <button
        key={index}
        className={btnClass}
        disabled={allAnswersChecked}
        onClick={() => handleClick(questionIndex, index)}
      >
        {item}
      </button>
    )
  })

  return (
    <div className="question-card">
      <h2>{question}</h2>
      <div className="answers">
        {answerElements}
      </div>
    </div>
  )
}
