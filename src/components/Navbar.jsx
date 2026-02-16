import React from 'react'
import DateTime from './DateTime'
import { Rnd } from 'react-rnd'

const Navbar = () => {
  return (
    <>
  
        <div className="w-full flex text-white/90  bg-zinc-800/60 backdrop-blur-xl p-1">
        <div className="left w-1/2 flex  gap-3 ml-2 ">
        <img src='/public/apple.svg' alt="" />
        <h1>Bhaskar Mishra</h1>
        <h1>File</h1>
        <h1>Window</h1>
        <h1>Terminal</h1>
        </div>
        <div className="right w-[50%]  flex gap-3 items-center justify-end mr-2">
            <img src='/public/wifi.svg' alt="" />
            <h1><DateTime/></h1>
        </div>
    </div>
   
    </>
  )
}

export default Navbar
