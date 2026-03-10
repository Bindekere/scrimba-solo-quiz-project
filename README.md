# Trivia Quiz App

A dynamic trivia quiz app built with React and Vite. Fetches real questions from the Open Trivia DB API, lets you customise your quiz, and scores you at the end.

## Live Demo

🔗 [capstonequizproject.netlify.app](https://capstonequizproject.netlify.app/)

## Features

- Choose your quiz category and number of questions before starting
- Questions and answer options fetched live from the [Open Trivia Database](https://opentdb.com/)
- Answers are randomly shuffled on every load so the correct answer is never in the same position
- Select an answer for each question, then check your score when done
- Loading spinner while questions are being fetched
- Score shown as both a fraction and percentage
- Play Again button to restart without refreshing the page

## Tech Stack

- React
- JavaScript (ES6+)
- CSS
- Vite
- [Open Trivia DB API](https://opentdb.com/api_config.php)
- [spinners-react](https://www.npmjs.com/package/spinners-react)

## How to Run Locally

```bash
# Clone the repo
git clone https://github.com/Bindekere/scrimba-solo-quiz-project.git

# Navigate into the project folder
cd scrimba-solo-quiz-project/quiz-react-project

# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

Built by [Aaron Lutalo](https://github.com/Bindekere)
