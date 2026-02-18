import React, { useState } from 'react'
import Dock from './Dock'
import Navbar from './Navbar'
import CollapseWindow from '../windows/CollapseWindow'
import Github from '../windows/Github'
import Notes from '../windows/Notes'
import Resume from '../windows/Resume'
import Spotify from '../windows/Spotify'
import Terminal from 'react-console-emulator'
import CLI from '../windows/CLI'

const Home = () => {
  const [windowState,setWindowState]=useState({
    github:false,
    resume:false,
    notes:false,
    spotify:false,
    cli:false,
  })
  return (
      <>
    <div className="w-full min-h-screen overflow-hidden bg-[url('C:\Users\HP\Desktop\MAC-0S\src\public\background.jpg')] relative bg-cover bg-center">
      {windowState.github?<Github windowName='github' windowState={windowState} setWindowState={setWindowState}/>:''}
      {windowState.resume?<Resume windowName='resume' windowState={windowState} setWindowState={setWindowState}/>:''}
      {windowState.notes?<Notes windowName='notes' windowState={windowState} setWindowState={setWindowState}/>:''}
      {windowState.spotify?<Spotify windowName='spotify' windowState={windowState} setWindowState={setWindowState}/>:''}
      {windowState.cli?<CLI windowName='cli' windowState={windowState} setWindowState={setWindowState}/>:''}
      <Navbar/>
      <Dock windowState={windowState} setWindowState={setWindowState}/>
    </div>
    </>
  )
}

export default Home
