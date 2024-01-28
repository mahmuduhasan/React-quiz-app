import { useQuiz } from "../Contexts/QuizContext";

function NextButton() {
  const { dispatch, answer, currQuestion, numQuestions } = useQuiz();
  if (answer === null) return null;
  if (currQuestion < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    );

  if (currQuestion === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}>
        Finish
      </button>
    );
}

export default NextButton;
