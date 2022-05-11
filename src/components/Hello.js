import "./Hello.css"
import {Link} from "react-router-dom"

const Hello = () => {
  return (
    <div className='myWrapper'>
      <div className="hello">
        <h1> Welcome to the Quiz</h1>
        <Link to="/game">
          <button className="btn btn-success" >start game</button>
        </Link>
      </div>
    </div>
  )
}

export default Hello