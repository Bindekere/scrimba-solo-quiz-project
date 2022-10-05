import React from "react";

export default function Intro(props){
    return(
        <div className="intro">
            <p id="title" >Let's get <strong>Quizzical</strong></p>
            <h2>Settings</h2>
        
            <form onSubmit={props.handleFormData}>
                <label htmlFor="Amount">Number of Questions:</label>
                <input type="number" id="Amount" name="amount" min="1" max="20" required></input>

                <label htmlFor="Category">Select Category:</label>
                <select name="category" id="Category" required>
                    <option value="10">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="21">Sports</option>
                    <option value="20">Mythology</option>
                    <option value="22">Geography</option>
                    <option value="17">Science & Nature</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="18">Science: Computers</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="28">Vehicles</option>
                    <option value="27">Animals</option>
                    <option value="24">Politics</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>
                </select>
                
                <button className="startBtn">Start quiz</button>
            </form>
        </div> 
    )
}