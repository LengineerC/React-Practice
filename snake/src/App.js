// import './App.css';
import { Route, Routes, Navigate, useRoutes } from 'react-router-dom';
// import { useState } from 'react';
// import Start from './componentes/Start/Start';
// import Level1 from './componentes/Level1/Level1'
// import GameOver from './componentes/GameOver/GameOver';

import Game from './componentes/Game/Game';
import Tools from './componentes/Tools/Tools';

import routes from './routes';

function App() {
  const element=useRoutes(routes);
  // const [isPlaying, setIsPlaying] = useState(true);
  // const [playTime, setPlayTime]=useState(0);
  // const [snakeLength,setSnakeLength]=useState(0);

  // const restartGame=()=>{
  //   setIsPlaying(true);
  // }

  // const handleDeath=(time)=>{
  //   setPlayTime(time);
  // }
  
  // return (
  //   isPlaying ? (
  //     <div>
  //       <Routes>
  //         <Route path='/' element={<Start />} />
  //         <Route path='/level1' element={<Level1 setIsPlaying={setIsPlaying} handleDeath={(time)=>handleDeath(time)} setSnakeLength={setSnakeLength}/>} />
  //       </Routes>
  //     </div>
  //   ) : (
  //     <GameOver restartGame={restartGame} playTime={playTime} snakeLength={snakeLength}/>
  //   )

  // );

  return (
    <div>
      {element}
    </div>
  );
}

export default App;
