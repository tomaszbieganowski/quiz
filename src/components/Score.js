import {Link} from "react-router-dom"
import "./Score.css"

const Score = ({Questions, Answers}) => {
  
//checking of correct answers
  const result = () => {
    let score = 0;
    Questions.forEach(question => {
      Answers.forEach(answer => {
        if(question.question === answer.question){
          if(question.correct_answer === answer.answer){
            score += 1;
          }
        }
      });  
    });
    return score;
  }

  return (
    <div className='myWrapper'>
      <div className="score">
        <p> 
          <strong>Congratulations</strong>, you have completed the game!
        </p>
        <h3>
          Your score is <strong>{result()} </strong> 
        </h3>
          <span>
            You got <strong>{(((result())/Answers.length) * 100).toFixed(0)}%</strong> of the correct answers
          </span>
        <Link to="/">
          <button className="btn btn-success" >Try again</button>
        </Link>
      </div>
    </div>
  )
}

export default Score