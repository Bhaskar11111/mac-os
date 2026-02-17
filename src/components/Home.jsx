import React from 'react'
import Dock from './Dock'
import Navbar from './Navbar'
import CollapseWindow from '../windows/CollapseWindow'
import Github from '../windows/Github'
import Notes from '../windows/Notes'
import Resume from '../windows/Resume'
import Spotify from '../windows/Spotify'

const Home = () => {
  return (
      <>
    <div className="w-full min-h-screen overflow-hidden bg-[url('C:\Users\HP\Desktop\MAC-0S\src\public\background.jpg')] relative bg-cover bg-center">
      <Navbar/>
      <Github/>
      <Resume/>
      <Notes/>
      <Spotify/>
      <Dock/>
    </div>
    </>
  )
}

export default Home
