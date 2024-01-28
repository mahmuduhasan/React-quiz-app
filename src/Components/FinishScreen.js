import { useQuiz } from "../Contexts/QuizContext";

function FinishScreen() {
  const { points, highScore, dispatch, maxPossiblePoint } = useQuiz();
  const percentage = (points / maxPossiblePoint) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage <= 99) emoji = "🥈";
  if (percentage >= 60 && percentage <= 79) emoji = "🥉";
  if (percentage >= 40 && percentage <= 59) emoji = "🏅";
  if (percentage >= 0 && percentage <= 39) emoji = "🔫";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoint} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore : {highScore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
