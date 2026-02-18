import React from 'react'
import { Rnd } from 'react-rnd'

const CollapseWindow = ({children,width='40vw', height='40vh',x='400', y='100',windowState,setWtindowState,windowName}) => {
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
    <div className="window cursor-alias active:z-160 bg-black/50 backdrop-blur-2xl rounded-xl relative w-full h-full flex flex-col overflow-hidden">
    <div className="w-full cursor-cell z-99 sticky top-0 p-2 bg-zinc-800/70 backdrop-blur-xl items-center flex gap-1">
        <div onClick={()=>setWtindowState((prev)=>({...prev, [windowName]:false}))} className="w-[2vh] group flex items-center justify-center relative h-[2vh] cursor-pointer rounded-full bg-red-500">
            <h1 className='text-black/60 hidden group-hover:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-90'><i className="ri-close-line"></i></h1>
        </div>
        <div className="w-[2vh] h-[2vh] group flex relative items-center justify-center cursor-pointer rounded-full bg-yellow-400">
            <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex text-black/60'><i className="ri-subtract-line"></i></h1>
        </div>
         <div className="w-[2vh] h-[2vh] group flex relative items-center justify-center cursor-pointer rounded-full bg-green-500">
            <h1 className='absolute text-xs top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex text-black/60'><i className="ri-fullscreen-exit-line"></i></h1>
        </div>
        <h1 className='text-xs ml-2 text-zinc-500 font-semibold'>bhaskarmishra - zsh__24</h1>
    </div>
    <div className="flex-1 overflow-y-scroll">
        {children}
        
    </div>
    </div>
   </Rnd>
   </>
  )
}

export default CollapseWindow
