import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import store from '../../redux/store'
import './GameOver.css'

export default function GameOver(props) {

    const deathSound = "/audio/death.wav";
    const deathSoundRef = useRef();
    useEffect(() => {
        deathSoundRef.current.play();
    }, [])

    const handleClick = () => {
        store.dispatch({ type: "clear", data: 0 })
        props.restartGame();
    }

    return (
        <div className='gameover_main'>
            <audio ref={deathSoundRef} preload='auto'>
                <source src={deathSound} type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
            <div className='gameover_title'>GAMEOVER</div>
            <div className='gameover_score'>
                <span style={{ display: "block", textShadow: '0px 0px 3px white', fontSize: '30px' }}>SCORE: {store.getState()}</span><br />
                TIME: {Math.floor(props.playTime / 60)}min {props.playTime % 60}s<br />
                LENGTH: {props.levelData.length}<br />
                SPEED: {Math.ceil(10000 / props.levelData.speed)} px/s
            </div>
            <NavLink className='gameover_btn' to='/game/menu' onClick={handleClick}>MENU</NavLink>
            <NavLink className='gameover_btn' to='/game/level1' onClick={handleClick}>RESTART</NavLink>
        </div>
    )
}
