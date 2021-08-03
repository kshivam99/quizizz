import React from "react";
import { useQuiz } from "../../reducer/quizReducer";
import styles from "./Question.module.css";

function Question() {
  const { state, dispatch } = useQuiz();
  const { quiz, currentQuestion } = state;
  const [clicked, setClicked] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");

  function clickHandler(option, correct_answer) {
    setClicked(true);
    setSelectedOption(option);
    dispatch({
      type: "UPDATE_ACCURACY",
      payload: option === correct_answer ? 1 : 0,
    });
    if (currentQuestion === quiz.length - 1) {
      dispatch({ type: "GAME_OVER" });
    }
  }

  function nextQuestion() {
    dispatch({ type: "NEXT_QUESTION" });
    setClicked(false);
    setSelectedOption("");
  }

  return (
    <div className={styles.container}>
      <h2>{quiz[currentQuestion].title}</h2>
      <div className={styles.options}>
        {quiz[currentQuestion].options.map((option) => (
          <button
            key={option}
            disabled={clicked}
            onClick={() =>
              clickHandler(option, quiz[currentQuestion].correct_answer)
            }
            className={
              quiz[currentQuestion].correct_answer !== option
                ? clicked && option === selectedOption && styles.incorrect
                : clicked && styles.correct
            }
          >
            {option}
          </button>
        ))}
      </div>
      <div
        className={styles.feedback}
        style={{ display: clicked ? "" : "none" }}
      >
        <button>
          {selectedOption === quiz[currentQuestion].correct_answer
            ? "Correct!"
            : "Sorry!"}
        </button>
        {currentQuestion < quiz.length - 1 && (
          <button onClick={nextQuestion}>Next Question</button>
        )}
      </div>
    </div>
  );
}

export default Question;
