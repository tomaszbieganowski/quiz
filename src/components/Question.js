import "./question.css"
const Question = (props) => {
  const data = props.data;

  const setAnswers = () => {
    const answers = [];
    let correct = data.correct_answer;
    data.incorrect_answers.forEach(item => answers.push(item));
    let max = answers.length;
    let rand =  Math.floor(Math.random() * max);
    answers.splice(rand, 0, correct);
    return answers
  }
 
  return (
      <div className="question">
        <p>{data.category}</p>
        <h2>
            {data.question}
        </h2>
        {data.type === "multiple" &&
          <>
              {setAnswers().map((element, id) => (
                <h3>
                  {element}
                </h3>
              ))}
          </>
        }
      </div>
  )
}

export default Question