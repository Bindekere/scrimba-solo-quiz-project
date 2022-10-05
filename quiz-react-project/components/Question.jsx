
import React from "react";

export default function Question({question,answers,handleClick,selected,correctAnswerIndex,allAnswersChecked}){
    const answerElements = answers.map((item,index)=>{
        
        return(
            <input className={`answerBtn 
            ${allAnswersChecked === true?
                (index === selected && (selected=== correctAnswerIndex? "correct": "wrong")):
                (index === selected && "selected")}`} 
                key = {index}
                type="button"
                id= {index}
                name="isSelected"// this is used update the state to add a new property which stores the index 
                // of the selected answer... this selected answer is then evaluated if it is === to the correct answer
                // the user has passed the question...isSelected: index
                value={item}
                onClick={handleClick}
                data-question= {question}
                disabled = {allAnswersChecked}
            />
        
    )})

        return(
            <div>
                <h2 className="question">{question}</h2>
                {answerElements}
            </div>
        )
}

