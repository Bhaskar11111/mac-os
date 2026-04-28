import React from 'react'

const Redirect = () => {
  const goHome = () => {
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <button
      type="button"
      onClick={goHome}
      className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm cursor-pointer text-white/80 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
    >
      Home
    </button>
  )
}

export default Redirect
