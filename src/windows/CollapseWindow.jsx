import React from 'react'
import { Rnd } from 'react-rnd'

const CollapseWindow = ({children}) => {
  return (
   <>
   <Rnd>
    <div className="w-[70vh] h-[50vh] bg-black/50 backdrop-blur-2xl rounded-xl overflow-hidden ">
    <div className="w-full p-2 bg-zinc-800 items-center flex gap-1">
        <div className="w-[2vh] h-[2vh] rounded-full bg-red-500"></div>
        <div className="w-[2vh] h-[2vh] rounded-full bg-yellow-400"></div>
        <div className="w-[2vh] h-[2vh] rounded-full bg-green-500"></div>
        <h1 className='text-xs ml-2 text-zinc-500 font-semibold'>bhaskarmishra - zsh__24</h1>
    </div>
    <h1 className='text-white/90 p-2'>{children}</h1>
    </div>
   </Rnd>
   </>
  )
}

export default CollapseWindow
