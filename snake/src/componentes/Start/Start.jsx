import React from 'react'
import { NavLink } from 'react-router-dom'

import "./Start.css"


export default function Start() {
  return (
    <div>
      <div className='menuBackground'>
        <div className='menuMain'>
            <div className='menuTitle'>
                Snake!
            </div>
            <div className='menuContainer'>
                <NavLink className='menuLink' to="../level1 ">Start</NavLink>
            </div>
            <div className='menuContainer'>
                <NavLink className='menuLink' to="../options">Options</NavLink>
            </div>
            <div className='menuContainer'>
                <NavLink className='menuLink' to="/tools">Tools</NavLink>
            </div>
        </div>
      </div>
    </div>
  )
}
