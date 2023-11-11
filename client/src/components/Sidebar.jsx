import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = (props) => {
  const navigate = useNavigate();

  const {handleHeroSelection} = props;

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className='h-screen w-2/12 bg-lime-300'>
      Sidebar
      <ul>
        <li><button onClick={() => handleHeroSelection('Dashboard')}>Dashboard</button></li>
        <li><button onClick={() => handleHeroSelection('AddEntry')}>Add Entry</button></li>
        <li><button onClick={() => handleLogOut()}>Log out</button></li>
      </ul>
    </div>
  )
}

export default Sidebar