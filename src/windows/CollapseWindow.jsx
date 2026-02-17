import React from 'react'
import { Rnd } from 'react-rnd'

const CollapseWindow = ({children,width='40vw', height='40vh',x='500', y='150'}) => {
  return (
   <>
   <Rnd default={
    {
        width:width,
        height:height,
        x:x,
        y:y,
    }
    
    
   }
   minWidth={200}
  maxWidth={1000}
  minHeight={200}
  maxHeight={800}>
    <div className="window active:z-160 bg-black/50 backdrop-blur-2xl rounded-xl relative overflow-y-scroll max-h-[100%]">
    <div className="w-full z-99 sticky top-0 p-2 bg-zinc-800/70 backdrop-blur-xl items-center flex gap-1">
        <div className="w-[2vh] h-[2vh] rounded-full bg-red-500"></div>
        <div className="w-[2vh] h-[2vh] rounded-full bg-yellow-400"></div>
        <div className="w-[2vh] h-[2vh] rounded-full bg-green-500"></div>
        <h1 className='text-xs ml-2 text-zinc-500 font-semibold'>bhaskarmishra - zsh__24</h1>
    </div>
    <div className="flex overflow-hidden">
        <h1 className='text-white/90 p-2'>{children}</h1>
        
    </div>
    </div>
   </Rnd>
   </>
  )
}

export default CollapseWindow
