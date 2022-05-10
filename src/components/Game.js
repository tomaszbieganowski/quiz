import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import './game.css'
import Question from './Question';

const Game = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswer] = useState([]);
  const [previousButtonState, setPreviousButton] = useState(false);
  const [nextButtonState, setNextButton] = useState(true);
  const [submitAnswer, setSubmitAnswer] = useState(false);

  const fitQuestion = (data) => {
    const questions = [];
    data.forEach((element) => {
      let answers = [];
      let correct = element.correct_answer;
      element.incorrect_answers.forEach(item => answers.push(item));
      let max = answers.length;
      let rand =  Math.floor(Math.random() * max);
      answers.splice(rand, 0, correct);

      questions.push({
        category: element.category,
        question: element.question,
        answers: answers,
        correct_answer: element.correct_answer,
        type: element.type
      })
    })
    setData(questions);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=5`);
        if (!response.ok) {
          throw new Error(
            `Error: ${response.status}`
          );
        }
        let actualData = await response.json();
        fitQuestion(actualData.results);
        setError(null);
      } catch(err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }  
    }
    getData()
  }, [])
  
  const getQuestion = (arr) => {
    return arr.find((el, i) => i === questionNumber);
  }

  const handleAnswer = (question, answer) => {
    let answers = userAnswers;
    userAnswers.forEach((element) => {
      if(element.question === question){
        userAnswers.splice(userAnswers.indexOf(element), 1);
      }
    })
    answers.push({question: question, answer: answer})
    setUserAnswer(answers);
    if(userAnswers.length === data.length){
      setSubmitAnswer(true);
    }else{
      setSubmitAnswer(false);
    }
  }

  const goToQuestion = (id) => {
    setQuestionNumber(id);
    setNextButton(true);
    setPreviousButton(true);
    if(id < 1){
      setPreviousButton(false);
    }
    if(id >= data.length-1){
      setNextButton(false);
    }
  }

  return (
    <div className="wrapper">
      {loading && <span>Loading data...</span>}
      {error && (
        <div>{`There is a problem fetching the data - ${error}`}</div>
      )}
      {data && 
      <div className="question">
          <Question data={getQuestion(data)} setAnswer={handleAnswer} answers={userAnswers}/>
      </div>
      }
      <div className="control">
        <button className="btn btn-success" 
          onClick={()=>goToQuestion(questionNumber-1)} 
          disabled={!previousButtonState}>
            previous
        </button>
        <button className="btn btn-success" 
          onClick={()=>goToQuestion(questionNumber+1)} 
          disabled={!nextButtonState}>
            next
        </button>
      </div>
      <p className="questionNumbersTitle">Question number</p>
      <div className="questionNumbers">
        {data&& data.map((element, id) => (
                <div className={id === questionNumber ? "questionNumber questionNumberActive" : "questionNumber"}
                  key={id}
                  onClick={() => goToQuestion(id)}>
                  {id+1}
                </div>
              ))
        }
      </div>
      <Link to="/score">
          <button className="btn btn-dark"
          disabled={!submitAnswer}>
            submit
          </button>
      </Link>
    </div>
  )
}

export default Game