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
      if (index === selected) {
        btnClass += selected === correctAnswerIndex ? ' correct' : ' wrong'
      }
    } else {
      if (index === selected) {
        btnClass += ' selected'
      }
    }

    return (
      <input
        key={index}
        className={btnClass}
        type="button"
        value={item}
        disabled={allAnswersChecked}
        onClick={() => handleClick(questionIndex, index)}
      />
    )
  })

  return (
    <div>
      <h2 className="question">{question}</h2>
      {answerElements}
    </div>
  )
}
