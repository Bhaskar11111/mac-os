import React, { useEffect, useState } from 'react'
import Home from '../src/components/Home'
import AuthPage from './components/auth/AuthPage'
import LandingPage from './components/landing/LandingPage'
import { useAuth } from './context/UserContext'

const App = () => {
  const { user, loading } = useAuth()
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePath = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePath)
    return () => window.removeEventListener('popstate', handlePath)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-white">
        Loading...
      </div>
    )
  }

  if (path === '/') {
    return <LandingPage />
  }

  if (!user && path === '/register') {
    return <AuthPage mode="register" />
  }

  if (!user && path === '/login') {
    return <AuthPage mode="login" />
  }

  if (!user && path === '/desktop') {
    window.history.replaceState({}, '', '/login')
    return <AuthPage mode="login" />
  }

  if (!user) {
    return <LandingPage />
  }

  if (user && (path === '/register' || path === '/login')) {
    window.history.replaceState({}, '', '/desktop')
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <Home/>
    </div>
  )
}

export default App
