import "./Question.css"
import { useState } from "react";

const Question = ({data, setAnswer, answers}) => {

  const [updateAnswer, setUpdateAnswer] = useState([]);

  //setting the responses as they are in the GAME component
  const setStyle = () => {
    let arr = [] ;
    answers.forEach(x => {
      arr.push(x.answer)
    });
    setUpdateAnswer(arr);
  };

  return (
      <div className="question">
        <p>{data.category}</p>
        <h2 dangerouslySetInnerHTML={{__html: data.question}}/>
        {
          <>
              {data.answers.map((element, id) => (
                <div className={updateAnswer.indexOf(element) >= 0 ? "answer selected" : "answer"} 
                  onClick={() => {
                    setAnswer(data.question, element); 
                    setStyle()
                  }} 
                  key={id}
                  dangerouslySetInnerHTML={{__html: element}}
                />
              ))}
          </>
        }
      </div>
  )
}

export default Question