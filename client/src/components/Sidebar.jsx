import React, { useState } from 'react'

const Sidebar = (props) => {

  const {handleHeroSelection} = props;

  return (
    <div className='h-screen w-2/12 bg-lime-300'>
      Sidebar
      <ul>
        <li><button onClick={() => handleHeroSelection('Dashboard')}>Dashboard</button></li>
        <li><button onClick={() => handleHeroSelection('AddEntry')}>Add Entry</button></li>
      </ul>
    </div>
  )
}

export default Sidebar