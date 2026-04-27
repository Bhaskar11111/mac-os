import React, { useContext } from 'react'
import CollapseWindow from './CollapseWindow'
import { UserContext } from '../context/UserContext'
import { useProfile } from '../context/ProfileContext'

const Github = ({ windowState, setWindowState, windowName, zIndex, bringToFront }) => {

  const { user } = useContext(UserContext)
  const { profile } = useProfile()
  const repos = profile?.githubRepos || user?.githubProjects || []

  return (
    <>
      <CollapseWindow 
        windowState={windowState} 
        setWindowState={setWindowState} 
        windowName={windowName}
        zIndex={zIndex}
        bringToFront={bringToFront}
        height='70vh' 
        width='50vw'
      >
        <div className="flex relative group flex-wrap items-center justify-center">

        {!repos?.length && (
  <p className="text-white/50">No projects added</p>
)}

          {repos?.map((elem, indx) => {
            const repoLink = elem.url || elem.repoLink
            return (
              <div key={indx} className="cards w-[44%] m-3 rounded-xl
              p-2 bg-white/18 backdrop-blur-[1.4px] max-h-[50vh] min-h-[10vh] flex flex-col items-center justify-center overflow-scroll 
              transition-all duration-200 ease-in-out hover:scale-105">

                {elem.image && (
                  <div className="w-full h-[25vh] rounded-4xl overflow-hidden">
                    <img 
                      className='w-full h-full object-cover object-center' 
                      src={elem.image} 
                      alt="" 
                    />
                  </div>
                )}

                <h1 className='text-xl  font-semibold text-white/90'>
                  {elem.title}
                </h1>

                <h1 className='text-sm text-gray-300 tracking-tight '>
                  {elem.description}
                </h1>

                <div className="flex flex-wrap gap-2 ">

                  {(elem.technologies || [elem.language].filter(Boolean))?.map((tech, i) => (
                    <h1 key={i} className='bg-zinc-100/1 rounded-full backdrop-blur-2xl text-zinc-300 px-3 mt-2 py-1 text-xs'>
                      {tech}
                    </h1>
                  ))}

                  <a href={repoLink} target="_blank">
                    <h1 className='w-[90%] mt-3 text-[10px] text-blue-400 truncate'>
                      {repoLink}
                    </h1>
                  </a>

                  {elem.demoLink && <a href={elem.demoLink} target="_blank">
                    <h1 className='w-[70%] text-[10px] text-blue-400 truncate mb-3'>
                      {elem.demoLink}
                    </h1>
                  </a>}

                </div>
              </div>
            )
          })}

        </div>
      </CollapseWindow>
    </>
  )
}

export default Github
