import { Routes ,Route } from 'react-router-dom';

import Hello from './components/Hello';
import Game from './components/Game';

const App = () => {
  return (
   <>
    <Routes>
      <Route path='/' element={<Hello/>} />
      <Route path="/game" element={<Game/>}/> 
    </Routes>
   </>
  );
}

export default App;
