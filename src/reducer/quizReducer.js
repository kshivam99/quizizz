import { createContext, useContext, useReducer } from "react";
import { quiz } from "../db/data";

export const quizReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
      case "UPDATE_ACCURACY":
        return {
          ...state,
          accuracy:((state.accuracy*state.currentQuestion)+action.payload)/(state.currentQuestion+1),
        };
        case "GAME_OVER":
            return {
              ...state,
              gameOver: true
            };
    default:
      return state;
  }
};

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, {
    quiz: quiz,
    currentQuestion: 0,
    accuracy: 0,
    gameOver: false,
  });
  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
