import React from 'react'

import { NavLink, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Calculator from './Calculator/Calculator'
import Unicode from './Unicode/Unicode'

import './Tools.css'

export default function Tools() {
    return (
        <div className='tools_main'>
            <div className='linkContainer'>
                <NavLink className={({ isActive }) => isActive ? 'linkBtn_active' : 'linkBtn'} to="./calculator">Calculator</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'linkBtn_active' : 'linkBtn'} to="./unicode">Unicode</NavLink>
                <NavLink className='linkBtn' to="/game/menu">Snake</NavLink>
            </div>
            <div className='componentContainer'>
                <Outlet/>
            </div>
        </div>
    )
}
