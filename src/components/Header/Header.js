import React from 'react'
import { useQuiz } from '../../reducer/quizReducer'
import styles from "./Header.module.css"

function Header() {
    const { state } = useQuiz();
    const {currentQuestion, accuracy, gameOver, quiz} = state;

    return (
        <div className={styles.container}>
            {
              !gameOver?<h2>Question {currentQuestion+1} of {quiz.length} </h2>:<h2>Game Over!</h2>
            }
            <h4>Accuracy: {(accuracy*100).toFixed(0)}%</h4>
        </div>
    )
}

export default Header
