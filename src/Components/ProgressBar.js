import { useQuiz } from "../Contexts/QuizContext";

function ProgressBar() {
  const { currQuestion, numQuestions, points, answer, maxPossiblePoint } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currQuestion + Number(answer !== null)}
      />
      <p>
        Question : <strong>{currQuestion + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoint}
      </p>
    </header>
  );
}

export default ProgressBar;
