const Question = (props) => {
    const data = props.data;
  return (
      <div>
        <h2>
            {data.question}
        </h2>
        <h3>
            {data.correct_answer}
        </h3>
      </div>
  )
}

export default Question