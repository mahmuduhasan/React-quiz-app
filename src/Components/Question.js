import { useQuiz } from "../Contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, dispatch, answer, currQuestion } = useQuiz();
  const question = questions[currQuestion];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
