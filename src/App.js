// import Header from './components/Header'

import { useState, useEffect } from "react";
import Question from './components/Question';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
        setData(actualData);
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
  const [previousButtonState, setPreviousButton] = useState(true);
  const [nextButtonState, setNextButton] = useState(false);
  
  const getQuestion = (arr) => {
    return arr.find((el, i) => i === questionNumber);
  }

  const previousQuestion = () => {
    setQuestionNumber(questionNumber - 1)
    setNextButton(false)
    if(questionNumber < 2){
      setPreviousButton(true)
    }else{
      setPreviousButton(false)
    }
  }
  const nextQuestion = () => {
    setQuestionNumber(questionNumber + 1)
    setPreviousButton(false)
    if(questionNumber < 3){
      setNextButton(false)
    }else{
      setNextButton(true)
    }
  }

  return (
    <div className="wrapper">
      {loading && <span>A moment please...</span>}
      {error && (
        <div>{`There is a problem fetching the data - ${error}`}</div>
      )}
      {data && 
          <Question data={getQuestion(data.results)} />
      }
      <button className="btn btn-success" onClick={previousQuestion} disabled={previousButtonState}>previous</button>
      <button className="btn btn-success" onClick={nextQuestion} disabled={nextButtonState}>next</button>
    </div>
  );
}

export default App;
