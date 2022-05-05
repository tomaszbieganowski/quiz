import "./hello.css"
import {Link} from "react-router-dom"

const Hello = ({onStage}) => {
  return (
    <div className='wrapper'>
      <div className="hello">
        <h1> Welcome to the Quiz Game</h1>
        <Link to="/game">
          <button className="btn btn-dark" >start game</button>
        </Link>
      </div>
    </div>
  )
}

export default Hello