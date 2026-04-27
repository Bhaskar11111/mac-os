import React from 'react'

const navigateTo = (path) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const features = [
  {
    title: 'A desktop, not a template',
    body: 'Every portfolio opens like a personal operating system, with draggable windows for projects, blogs, socials, GitHub, music, and more.'
  },
  {
    title: 'Built for multi-user creators',
    body: 'Sign up, save your profile, personalize your data, and turn a normal resume into an interactive public workspace.'
  },
  {
    title: 'AI review built in',
    body: 'Project Hercules helps developers review code inside the same portfolio environment they use to showcase their work.'
  }
]

const stats = [
  ['macOS UI', 'Familiar, polished, memorable'],
  ['GitHub Sync', 'Top repositories cached automatically'],
  ['Custom Desktop', 'Wallpaper and profile personalization']
]

const LandingPage = () => {
  return (
    <main className="min-h-screen overflow-y-auto bg-zinc-950 text-white">
      <section className="relative min-h-[92vh] overflow-hidden bg-[url('/background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/55 via-black/35 to-zinc-950" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">

            <img src="/apple.svg" alt="" className="h-8 w-8" />
            <span className="text-sm font-semibold tracking-wide">Macintosh OS</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/login')}
              className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/85 backdrop-blur-xl transition hover:bg-white/10 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigateTo('/register')}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-100 cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Portfolio platform for builders
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-white lg:text-6xl">
              The best portfolio app should feel alive.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Macintosh OS turns every user profile into a beautiful macOS-style desktop, complete with windows, GitHub projects, blogs, socials, AI code review, and a customizable workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('/register')}
                className="rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white cursor-pointer"
              >
                Create my portfolio
              </button>
              <button
                onClick={() => navigateTo('/login')}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10 cursor-pointer"
              >
                Login to desktop
              </button>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[425px]">
            <img
              src="/macintosh2.png"
              alt="macOS portfolio preview"
              className="absolute mt-5 right-0 top-8 w-[74%] max-w-md rounded-[2rem] object-contain drop-shadow-2xl"
            />
            <div className="absolute bottom-8 left-0 w-[82%] rounded-2xl border border-white/15 bg-black/45 p-4 shadow-2xl backdrop-blur-2xl sm:w-[72%]">
              <div className="mb-3 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-3 text-sm text-white/78">
                <p>~/portfolio launch --public</p>
                <p className="text-cyan-200">GitHub repos synced. Blog windows loaded. AI reviewer ready.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-px px-6 pb-8 md:grid-cols-3">
          {stats.map(([title, body]) => (
            <div key={title} className="border-t border-white/15 py-5">
              <h2 className="text-sm font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-white/55">{body}</p>
            </div>
          ))}
        </div>
      </section>

      
    </main>
  )
}

export default LandingPage
