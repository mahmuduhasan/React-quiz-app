import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  currQuestion: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const SEC_PER_QUESTION = 10;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.currQuestion);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, currQuestion: state.currQuestion + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        currQuestion: 0,
        answer: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    default:
      throw new Error("Invalid Action");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      currQuestion,
      answer,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoint = questions.reduce((prev, acc) => {
    return prev + acc.points;
  }, 0);
  useEffect(() => {
    fetch("https://the-react-quiz-data.onrender.com/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        currQuestion,
        answer,
        points,
        highScore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPossiblePoint,
      }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Context called before Provider");
  return context;
}

export { QuizProvider, useQuiz };
