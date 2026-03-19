import React, { useContext } from 'react'
import CollapseWindow from './CollapseWindow'
import { UserContext } from '../context/UserContext'

const Github = ({ windowState, setWindowState, windowName }) => {

  const { user } = useContext(UserContext)

  return (
    <>
      <CollapseWindow 
        windowState={windowState} 
        setWindowState={setWindowState} 
        windowName={windowName} 
        height='70vh' 
        width='50vw'
      >
        <div className="flex relative group flex-wrap items-center justify-center">

        {!user?.githubProjects?.length && (
  <p className="text-white/50">No projects added</p>
)}

          {user?.githubProjects?.map((elem, indx) => {
            return (
              <div key={indx} className="cards w-[44%] m-3 rounded-4xl
              p-2 bg-white/8 backdrop-blur-[1.4px] max-h-[50vh] overflow-hidden hover:overflow-scroll
              transition-all duration-500 ease-in-out hover:scale-110">

                <div className="w-full h-[25vh] rounded-4xl overflow-hidden">
                  <img 
                    className='w-full h-full object-cover object-center' 
                    src={elem.image} 
                    alt="" 
                  />
                </div>

                <h1 className='text-xl mt-2 font-semibold text-white/90'>
                  {elem.title}
                </h1>

                <h1 className='text-sm text-gray-500 tracking-tight mt-2'>
                  {elem.description}
                </h1>

                <div className="flex flex-wrap gap-3 mt-2">

                  {elem.technologies?.map((tech, i) => (
                    <h1 key={i} className='bg-zinc-100/1 rounded-full backdrop-blur-2xl text-zinc-400 px-3 py-1 text-xs'>
                      {tech}
                    </h1>
                  ))}

                  <a href={elem.repoLink} target="_blank">
                    <h1 className='w-[90%] text-[10px] text-blue-700 truncate'>
                      {elem.repoLink}
                    </h1>
                  </a>

                  <a href={elem.demoLink} target="_blank">
                    <h1 className='w-[70%] text-[10px] text-blue-700 truncate mb-3'>
                      {elem.demoLink}
                    </h1>
                  </a>

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