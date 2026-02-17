import React from 'react'
import Dock from './Dock'
import Navbar from './Navbar'
import CollapseWindow from '../windows/CollapseWindow'
import Github from '../windows/Github'

const Home = () => {
  return (
      <>
    <div className="w-full h-screen bg-[url('C:\Users\HP\Desktop\MAC-0S\src\public\background.jpg')] bg-cover bg-center">
      <Navbar/>
      <Github/>
      <Dock/>
    </div>
    </>
  )
}

export default Home
