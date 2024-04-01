// import logo from './logo.svg';
import React from 'react';
// import { NavLink, Routes, Route, Navigate} from 'react-router-dom';

// import './App.css';
// import Calculator from './components/Calculator/Calculator';
// import Unicode from './components/Unicode/Unicode';

import Tools from './components/Tools/Tools';

function App() {
  return (
    // <div className='tools_main'>
    //   <div className='linkContainer'>
    //     <NavLink className={({isActive})=>isActive?'linkBtn_active':'linkBtn'} to="/calculator">Calculator</NavLink>
    //     <NavLink className={({isActive})=>isActive?'linkBtn_active':'linkBtn'} to="/unicode">Unicode</NavLink>
    //   </div>
    //   <div className='componentContainer'>
    //     <Routes>
    //       <Route path="/calculator" element={<Calculator/>} />
    //       <Route path="/unicode" element={<Unicode/>} />
    //       <Route path='/' element={<Navigate to='/unicode'/>}/>
    //     </Routes>
    //   </div>
    // </div>
    <Tools/>
  );
}

export default App;
