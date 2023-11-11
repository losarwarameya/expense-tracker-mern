import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Hero from './Hero'

const HomePage = () => {

  const [hero,setHero] = useState('Dashboard');
  const handleHeroSelection = (val) => {
    console.log("hi");
    setHero(val);
  }

  return (
    <div className='flex'>
        <Sidebar handleHeroSelection={handleHeroSelection}/>
        <Hero hero={hero}/>
    </div>
  )
}

export default HomePage