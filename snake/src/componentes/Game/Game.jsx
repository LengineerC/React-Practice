import React from 'react'
import { useState } from 'react';
import { Route, Routes, Navigate,useRoutes } from 'react-router-dom';
// import Start from './componentes/Start/Start';
// import Level1 from './componentes/Level1/Level1'
// import GameOver from './componentes/GameOver/GameOver';

import Start from '../Start/Start';
import Level1 from '../Level1/Level1';
import GameOver from '../GameOver/GameOver';
import Options from '../Options/Options';

export default function Game() {
    
    const [isPlaying, setIsPlaying] = useState(true);
    const [playTime, setPlayTime]=useState(0);
    // const [snakeLength,setSnakeLength]=useState(0);

    const [levelData,setLevelData]=useState({});
  
    const restartGame=()=>{
      setIsPlaying(true);
    }
  
    const handleDeath=(time)=>{
      setPlayTime(time);
    }

    const gameRoutes=[
        {
            path:'menu',
            element:<Start/>
        },
        {
            path:'level1',
            element:<Level1 setIsPlaying={setIsPlaying} handleDeath={(time)=>handleDeath(time)} setLevelData={setLevelData}/>
        },
        {
            path:'options',
            element:<Options />
        },
        {
            path:'/',
            element:<Navigate to='menu'/>
        }
    ]
    
    const routing=useRoutes(gameRoutes);

    return (
      isPlaying ? (
        <div>
          {/* <Routes>
            <Route path='./menu' element={<Start />} />
            <Route path='./level1' element={<Level1 setIsPlaying={setIsPlaying} handleDeath={(time)=>handleDeath(time)} setSnakeLength={setSnakeLength}/>} />
          </Routes> */}
          {routing}
        </div>
      ) : (
        <GameOver restartGame={restartGame} playTime={playTime} levelData={levelData}/>
      )
    );
}
