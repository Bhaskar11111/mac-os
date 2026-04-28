
import React, { useEffect, useRef, useState } from 'react'
import Dock from './Dock'
import Navbar from './Navbar'
import Github from '../windows/Github'
import Notes from '../windows/Notes'
import Spotify from '../windows/Spotify'
import CLI from '../windows/CLI'
import DesktopOnly from './DesktopOnly'
import Hercules from '../windows/Hercules'
import ProfileEditor from '../windows/ProfileEditor'
import Portfolio from '../windows/Portfolio'
import WallpaperPicker from './WallpaperPicker'
import { useAuth } from '../context/UserContext'

const DEFAULT_WALLPAPER = '/background.jpg'

const Home = () => {
  const { user } = useAuth()
  const userWallpaperKey = user?.id || user?.email || 'guest'
  const wallpaperStorageKey = `desktopWallpaper:${userWallpaperKey}`
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 1024
  );
  const [wallpaper,setWallpaper]=useState(() => localStorage.getItem(wallpaperStorageKey) || DEFAULT_WALLPAPER)
  const [windowState,setWindowState]=useState({
    github:false,
    notes:false,
    spotify:false,
    cli:false,
    hercules:false,
    profileEditor:false,
    portfolio:false
  })
  const [windowStack,setWindowStack]=useState({
    github:10,
    notes:10,
    spotify:10,
    cli:10,
    hercules:10,
    profileEditor:10,
    portfolio:10
  })
  const topZIndexRef=useRef(20)

  const bringToFront = (windowName) => {
    if (!windowName) return

    topZIndexRef.current += 1
    setWindowStack((prev) => ({
      ...prev,
      [windowName]: topZIndexRef.current
    }))
  }

  const openWindow = (windowName) => {
    setWindowState((prev) => ({
      ...prev,
      [windowName]: !prev[windowName]
    }))
    bringToFront(windowName)
  }
  
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return <DesktopOnly />;
  }

  return (
      <>
    <div
      className="w-full min-h-screen relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url("${wallpaper}")` }}
    >
      {windowState.github?<Github windowName='github' windowState={windowState} setWindowState={setWindowState} zIndex={windowStack.github} bringToFront={bringToFront}/>:''}
      {windowState.hercules?<Hercules windowName='hercules' windowState={windowState} setWindowState={setWindowState} zIndex={windowStack.hercules} bringToFront={bringToFront}/>:''}
      {windowState.notes?<Notes windowName='notes' windowState={windowState} setWindowState={setWindowState} zIndex={windowStack.notes} bringToFront={bringToFront}/>:''}
      {windowState.spotify?<Spotify windowName='spotify' windowState={windowState} setWindowState={setWindowState} zIndex={windowStack.spotify} bringToFront={bringToFront}/>:''}
      {windowState.cli?<CLI windowName='cli' windowState={windowState} setWindowState={setWindowState} zIndex={windowStack.cli} bringToFront={bringToFront}/>:''}
      {windowState.profileEditor?<ProfileEditor windowName='profileEditor' windowState={windowState} setWindowState={setWindowState} zIndex={windowStack.profileEditor} bringToFront={bringToFront}/>:''}
      {windowState.portfolio?<Portfolio windowName='portfolio' windowState={windowState} setWindowState={setWindowState} zIndex={windowStack.portfolio} bringToFront={bringToFront}/>:''}
      <Navbar/>
      <Dock openWindow={openWindow}/>
      <WallpaperPicker storageKey={wallpaperStorageKey} onChange={setWallpaper}/>
    </div>
    </>
  )
}

export default Home
