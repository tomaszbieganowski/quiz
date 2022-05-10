import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import Question from './Question';

const Game = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswer] = useState([]);
  const [previousButtonState, setPreviousButton] = useState(false);
  const [nextButtonState, setNextButton] = useState(true);
  
  const getQuestion = (arr) => {
    return arr.find((el, i) => i === questionNumber);
  }

  const handleAnswer = (question, answer) =>{
    let answers = userAnswers;
    userAnswers.forEach((element) => {
      if(element.question === question){
        userAnswers.splice(element, 1);
      }
    })
    answers.push({question: question, answer: answer})
    setUserAnswer(answers);
  }

  const previousQuestion = () => {
    setQuestionNumber(questionNumber - 1)
    setNextButton(true)
    if(questionNumber < 2){
      setPreviousButton(false)
    }else{
      setPreviousButton(true)
    }
  }
  const nextQuestion = () => {
    setQuestionNumber(questionNumber + 1)
    setPreviousButton(true)
    if(questionNumber < data.length-2){
      setNextButton(true)
    }else{
      setNextButton(false)
    }
  }

  return (
    <div className="wrapper">
      {loading && <span>A moment please...</span>}
      {error && (
        <div>{`There is a problem fetching the data - ${error}`}</div>
      )}
      {data && 
      <div className="question">
          <Question data={getQuestion(data)} setAnswer={handleAnswer} answers={userAnswers}/>
      </div>
      }
      <div className="control">
        <button className="btn btn-success" onClick={previousQuestion} disabled={!previousButtonState}>previous</button>
        <Link to="/score">
          <button className="btn btn-dark">submit</button>
        </Link>
        <button className="btn btn-success" onClick={nextQuestion} disabled={!nextButtonState}>next</button>
      </div>
    </div>
  )
}

export default Game