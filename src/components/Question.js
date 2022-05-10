import "./question.css"
import { useState } from "react";

const Question = ({data, setAnswer, answers}) => {
   
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [className, setclassName] = useState("answer");


  const handleSelected = (element) => {
    setSelectedAnswer(element);
    setclassName("answer selected");
  };

  const checkAnswer = (ans) => {
    answers.forEach(element => {
      console.log(element.answer + " === " + ans)
      if(element.answer === ans){
        return false;
      }
    });
    return true;
  }

  return (
      <div className="question">
        <p>{data.category}</p>
        <h2>
            {data.question}
        </h2>
        {data.type === "multiple" &&
          <>
              {data.answers.map((element, id) => (
                <div className={checkAnswer(element) && selectedAnswer === element ? className: "answer"} 
                  onClick={() => {setAnswer(data.question, element); handleSelected(element)}} 
                  key={id}>
                  {element}
                </div>
              ))}
          </>
        }
      </div>
  )
}

export default Question