import React, { useState, useEffect, useRef } from 'react'
import store from '../../redux/store';
import DataBar from '../DataBar/DataBar';

import './Level1.css'

export default function Level1(props) {
  const eatingSound = "/audio/eating.wav";
  const updatingSound = "/audio/updating.wav";
  
  const eatingSoundRef=useRef();
  const updatingSoundRef=useRef();

  const canvasRef=useRef(null);
  const hasEatenCoin=useRef(false);
 
  const [snake,setSnake]=useState([{x:2,y:60},{x:2,y:61}]);
  const [snakeSpeed,setSnakeSpeed]=useState(150);
  const [direction,setDirection]=useState({x:0,y:-1});
  
  const [pause,setPause]=useState(false);
  const [dead,setDead]=useState(false);

  const [coinExisting,setCoinExisting]=useState(false);
  const [coinPosition,setCoinPosition]=useState({x:0,y:0});
  
  const [time,setTime]=useState(0);

  const [scoreAddPartValid, setScoreAddPartValid]=useState(true);
  const [timeAddPartValid, setTimeAddPartValid]=useState(true);
  // const positionIsValid=[];

  useEffect(()=>{
    if(!pause&&!dead){
      let timer;
      timer=setInterval(()=>{
        setTime(prevTime=>prevTime+1);
      },1000)
      return ()=>clearInterval(timer);
    }
    return ()=>{}
  },[pause,dead])

  const getRandomInt=(min,max)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //#region 按键检测
  const handleKeyDown=event=>{
    if(event.keyCode===27){
      setPause(!pause);
    }

    if(!pause){
      if(event.keyCode===38&&direction.y!==1) setDirection({x: 0, y: -1});
      if(event.keyCode===40&&direction.y!==-1) setDirection({x: 0, y: 1});
      if(event.keyCode===37&&direction.x!==1) setDirection({x: -1, y: 0});
      if(event.keyCode===39&&direction.x!==-1) setDirection({x: 1, y: 0});
    }
  }
  useEffect(()=>{
    window.addEventListener('keydown',handleKeyDown);
    // console.log(direction);
    // console.log(pause);
    return ()=>window.removeEventListener('keydown',handleKeyDown);
  },[direction,pause]);
//#endregion


  const drawSnakePart=(ctx, part, index, snakeArray)=>{
    const size = 10; 
    ctx.fillStyle = 'green';
    if (index === 0) { 
      ctx.beginPath();
      let startAngle, endAngle;
      if(direction.x === 1) { 
        startAngle = 0.5 * Math.PI;
        endAngle = 1.5 * Math.PI;
      } else if(direction.x === -1) { 
        startAngle = 1.5 * Math.PI;
        endAngle = 0.5 * Math.PI;
      } else if(direction.y === 1) { 
        startAngle = 1 * Math.PI;
        endAngle = 0 * Math.PI;
      } else if(direction.y === -1) { 
        startAngle = 0 * Math.PI;
        endAngle = 1 * Math.PI;
      }
      ctx.arc(part.x * size + size / 2, part.y * size + size / 2, size / 2, startAngle, endAngle);
      ctx.fill();
    } else if (index === snakeArray.length - 1) {
      ctx.beginPath();
      if(snakeArray.length > 1) {
        const tailDirection = { x: part.x - snakeArray[index - 1].x, y: part.y - snakeArray[index - 1].y };
        if(tailDirection.x === 1) {
          ctx.moveTo(part.x * size, part.y * size);
          ctx.lineTo(part.x * size, part.y * size + size);
          ctx.lineTo(part.x * size + size, part.y * size + size / 2);
        } else if(tailDirection.x === -1) { 
          ctx.moveTo(part.x * size + size, part.y * size);
          ctx.lineTo(part.x * size + size, part.y * size + size);
          ctx.lineTo(part.x * size, part.y * size + size / 2);
        } else if(tailDirection.y === 1) {
          ctx.moveTo(part.x * size, part.y * size);
          ctx.lineTo(part.x * size + size, part.y * size);
          ctx.lineTo(part.x * size + size / 2, part.y * size + size);
        } else if(tailDirection.y === -1) { 
          ctx.moveTo(part.x * size, part.y * size + size);
          ctx.lineTo(part.x * size + size, part.y * size + size);
          ctx.lineTo(part.x * size + size / 2, part.y * size);
        }
      }
      ctx.fill();
    } else { 
      ctx.fillRect(part.x * size, part.y * size, size, size);
    }
  }

  const drawCoin=(ctx,pos)=>{
    ctx.fillStyle="gold";
    ctx.beginPath();
    ctx.arc(pos.x*10+5,pos.y*10+5,5,0,2*Math.PI);
    ctx.fill();
  }

  const inCoinPos=()=>{
    return (snake[0].x===coinPosition.x)&&(snake[0].y===coinPosition.y);
  }

  const addSnakePart=(n=1)=>{
    let newSnake=[...snake];
    for(let i=0;i<n;i++){
      let preSnakePart=newSnake[newSnake.length-2]
      let lastSnakePart=newSnake[newSnake.length-1];
      let x=lastSnakePart.x-preSnakePart.x;
      let y=lastSnakePart.y-preSnakePart.y;
      let newSnakePart={x:lastSnakePart.x+x,y:lastSnakePart.y+y};
      newSnake=[...newSnake,newSnakePart];
    }
    // setSnake([...snake,newSnakePart]);
    setSnake(newSnake)
  }

  const isDead = () => {
    let isHitBorder = snake[0].x >= 70 || snake[0].x < 0 || snake[0].y >= 70 || snake[0].y < 0;
  
    let snakeHead = snake[0];
    let currentSnakeBody = snake.slice(1);
    let bitSelf = currentSnakeBody.some(part => {
        return part.x === snakeHead.x && part.y === snakeHead.y;
    });
  
    return isHitBorder || bitSelf;
  }

  // useEffect(()=>{
  //   if(positionIsValid.length===0){
  //     for(let i=0;i<70;i++){
  //       let row=[]
  //       for(let j=0;j<70;j++){
  //         row.push(true);
  //       }
  //       positionIsValid.push(row);
  //     }
  //     console.log(positionIsValid);
  //   }
  // },[]);

  useEffect(()=>{
    if(dead){
      props.handleDeath(time);
      // props.setSnakeLength(snake.length);
      props.setIsPlaying(false);

      props.setLevelData({length:snake.length,speed:snakeSpeed})
    }
  },[dead]);

  useEffect(()=>{
    let gameLoop;
    if(!pause){
      const ctx=canvasRef.current.getContext('2d');
      ctx.clearRect(0,0,700,700);

      //画蛇
      //#region ver1
      // snake.forEach(part=>{
      //   ctx.fillStyle='green';
      //   ctx.fillRect(part.x*10,part.y*10,10,10);
      // })

      //#endregion
      const moveSnake=()=>{
        setSnake(snake=>{
          let head={x:snake[0].x+direction.x, y:snake[0].y+direction.y};
          let newSnake=[head,...snake.slice(0,-1)];
          return newSnake;
        })
      }

      if(coinExisting){
        drawCoin(ctx,coinPosition);
      }

      // if(inCoinPos()){
      //   console.log(store.getState());
      //   store.dispatch({type:"increment",data:1});
      //   setCoinExisting(false);
      // }

      //#region ver2
      snake.forEach((part, index) => {
        drawSnakePart(ctx, part, index, snake);
      });
      //#endregion
      
      setDead(isDead());
      gameLoop=setInterval(moveSnake,snakeSpeed);
      return ()=>clearInterval(gameLoop);
    }

    // console.log(snake[0].x,snake[0].y);
  },[snake,direction,pause,snakeSpeed,coinExisting,coinPosition]);

  useEffect(()=>{
    // console.log("test")
    if(!coinExisting){
      let pos={x:getRandomInt(0,69),y:getRandomInt(0,69)};
      // console.log(pos);
      setCoinPosition(pos);
      setCoinExisting(true);
    }
  },[coinExisting,snake,[]])

  useEffect(()=>{
    if(inCoinPos() && !hasEatenCoin.current){
      eatingSoundRef.current.play();
      setCoinExisting(false);
      store.dispatch({type:"increment",data:1});
      // console.log(store.getState());
      addSnakePart(); 
      hasEatenCoin.current=true;
    }else if(!inCoinPos()){
      hasEatenCoin.current=false;
    }
  },[snake,coinPosition])

  //增加游戏难度
  useEffect(()=>{
    if(scoreAddPartValid && store.getState()!==0 && store.getState()%5===0){
      console.log('1')
      updatingSoundRef.current.play();
      setScoreAddPartValid(false);
      addSnakePart(2);
    }else if(!scoreAddPartValid && store.getState()!==0 && store.getState()%5!==0){
      setScoreAddPartValid(true);
    }
    if(scoreAddPartValid &&store.getState()!==0 && store.getState()%20===0){
      console.log('2')
      updatingSoundRef.current.play();
      setScoreAddPartValid(false);
      if(snakeSpeed>50){
        setSnakeSpeed(prev=>prev-getRandomInt(1,20));
      }
    }

    if(timeAddPartValid && time!==0 && time%30===0){
      console.log('3')
      updatingSoundRef.current.play();
      setTimeAddPartValid(false);
      addSnakePart(2);
    }else if(!timeAddPartValid && time!==0 && time%30!==0){
      setTimeAddPartValid(true);
    }
    if(timeAddPartValid && time!==0 && time%30===0){
      console.log('4')
      updatingSoundRef.current.play();
      setTimeAddPartValid(false);
      if(snakeSpeed>25){
        setSnakeSpeed(prev=>prev-getRandomInt(1,10));
      }
    }else if(!timeAddPartValid && time!==0 && time%30!==0){
      setTimeAddPartValid(true);
    }
  },[time,snake])

  return (
    <div className='level1_main'>
      <audio ref={eatingSoundRef} preload='auto'>
        <source src={eatingSound} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={updatingSoundRef} preload='auto'>
        <source src={updatingSound} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      <div className='map'>
        {
          pause? <div id="pause">PAUSE</div> : <canvas ref={canvasRef} width='700' height='700' id="gameCanvas"></canvas>
        }
      </div>
      <div className='dataBar'>
        <DataBar speed={snakeSpeed} time={time} snakeLength={snake.length}/>
      </div>
    </div>
  )
}

