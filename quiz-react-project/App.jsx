import React from 'react'
import { useEffect, useState} from 'react'
import Intro from "./components/Intro"
import Question from "./components/Question"
import decodeHtml from './components/DecodeHtml'
import { SpinnerInfinity } from 'spinners-react';


function App() {
    const [questionData, setQuestionData] = useState([]) // questionData is the data received from the API call... it is then modified to best suit this app
    const [allAnswersChecked, setallAnswersChecked] = useState(false) // it is true when all questions have been answered 
    const [answerCount, setAnswerCount] = useState(null) // It is used to track how many answers were correct
    const [settings, setSettings] = useState({}) // the settings are mainly used in the API call 
    const [loading, setLoading] = useState(false) // for the loading screen

    useEffect(()=>APIcall(),[settings])

    function handleSettings(event) {
        event.preventDefault()
        const set = {
            [event.target[0].name]: parseInt(event.target[0].value),
            [event.target[1].name]: parseInt(event.target[1].value),
            gameStarted: true // could have used state to track whether the game has started but the asynchronous behaviour of state was causing bugs
        }
        setSettings(set)
        // right before the API call Loading === true so that it displays a loading screen while fetching data from the API...
        setLoading(true) 
    }
    function APIcall(){
        fetch(`https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}`)
            .then(response => response.json())
            .then((data) => {

                let dataWithAnswers = data.results.map((questionObject)=>{

                    const correctAnsIndex = Math.floor(Math.random()*(questionObject.incorrect_answers.length + 1))
                    // the correct answer is given a random index and then stored in a variable
                    // then an array is formed from merging the correct answer and the incorrect answers array
                    // the correct answer is at a random index in that array
                    let Answers = questionObject.incorrect_answers.slice()
                    Answers.splice(correctAnsIndex, 0, questionObject.correct_answer)
                    Answers = Answers.map(answer => decodeHtml(answer))

                    // data from the API is then modifed to best suit the app
                return{
                    ...questionObject,
                    allAnswers : Answers,
                    isSelected: "",
                    correctAnswerIndex: correctAnsIndex
                }})
            setQuestionData(dataWithAnswers)
            // when the api call is made and data is returned the Loading === false so that the data can display...
            setLoading(false)
            }
        )
    }
    function answeredAll(array){
        return array.every((obj)=>{
            return obj.isSelected === 0? true: obj.isSelected
        })
    }

    function checkAnswers(){
        setallAnswersChecked(true)
        let count = 0;
        questionData.forEach(item => {item.isSelected===item.correctAnswerIndex?count = count + 1: count})
        setAnswerCount(count)
    }
    const questionElements = questionData.map((questionObject,index) =>{
            // this was one of the most interesting parts of the app
            // i mapped over the questionData again and added the 'isSelected' property 
            // 'isSelected' identifies which answer the user selected and every answer knows what question it belongs to...
            // through the dataset property.. 
            // i could have used useRef hook but i learnt it later during the project..
            // i don't know if this is the most effecient way to track events and modify data according to the events but this sure works for me.. 
        function handleClick(event){
                const {name, id, dataset} = event.target
                let newData = questionData.map((questionObject)=>{
                    
                    if(questionObject.question===dataset.question){

                        const newQuestionObject = {
                            ...questionObject,
                            [name]: parseInt(id)
                        }
                        return newQuestionObject
                    }
                    else{
                        return questionObject
                    }
                    
                })
                
                setQuestionData(newData)
        }
        return (<Question question = {decodeHtml(questionObject.question)} 
                        answers = {questionObject.allAnswers}
                        handleClick= {handleClick}
                        selected={questionObject.isSelected}
                        allAnswersChecked = {allAnswersChecked} 
                        correctAnswerIndex= {questionObject.correctAnswerIndex}
                        key = {index}
                />
        )
    })
   
    
    return(
        <main>{ loading? 
                <SpinnerInfinity enabled= {true} color="#4D5B9E" secondaryColor="#ababab"/>:
                <>
                    {settings.gameStarted === true?
                    <div className='quiz'>
                        {questionElements}
                        {answeredAll(questionData) && <button 
                            className='check' 
                            onClick={checkAnswers}>Check Answers</button>
                        }
                        {allAnswersChecked && <h3>{`Mark: ${Math.round((answerCount / questionData.length)*100)}%`}</h3>}
                    </div>
                :<Intro handleFormData={handleSettings} />}   
            </>}
        </main>
    )
}
export default App