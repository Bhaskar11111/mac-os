import React, { useEffect, useState } from 'react'
import Home from '../src/components/Home'
import AuthPage from './components/auth/AuthPage'
import { useAuth } from './context/UserContext'

const App = () => {
  const { user, loading } = useAuth()
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePath = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePath)

    if (window.location.pathname === '/') {
      window.history.replaceState({}, '', '/register')
      setPath('/register')
    }

    return () => window.removeEventListener('popstate', handlePath)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-white">
        Loading...
      </div>
    )
  }

  if (!user && path !== '/login') {
    return <AuthPage mode="register" />
  }

  if (!user && path === '/login') {
    return <AuthPage mode="login" />
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
