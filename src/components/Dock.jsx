import React from "react";

const Dock = () => {
    console.log(new Date);
    
  return (
    <div className="  flex items-center justify-center 
    p-2 absolute bottom-3 left-1/2 -translate-x-1/2 
    bg-zinc-500/40 backdrop-blur-xl rounded-xl">

      <div className="flex gap-2 items-center">

        <img className="dock-icon w-12  p-1 bg-zinc-900 rounded-xl hover:-translate-y-[30%] hover:scale-125  transition-all ease-in-out duration-200 cursor-pointer" src="/github.svg" />
        <img className="dock-icon w-12  bg-linear-to-b from-cyan-400 rounded-xl hover:-translate-y-[30%] to-blue-500 p-1 hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/link.svg" />
        <img className="dock-icon w-12  bg-linear-to-b from-red-500 to-red-800 rounded-xl hover:-translate-y-[30%] hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/mail.svg" />
        <img className="dock-icon w-12  bg-linear-to-b from-amber-400 to-amber-600 p-1 rounded-xl  hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer rounded-xl hover:-translate-y-[30%]" src="/note.svg" />
        <img className="dock-icon w-12  p-1 bg-linear-to-b from-rose-500 to-rose-900 rounded-xl hover:-translate-y-[30%] hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/pdf.svg" />
        <img className="dock-icon w-12  p-1 bg-linear-to-b from-lime-400 to-green-600 rounded-xl hover:-translate-y-[30%] hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/spotify.svg" />
        <img className="dock-icon w-12  p-1 bg-linear-to-b from-teal-500 to-teal-800 rounded-xl hover:-translate-y-[30%] hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/calender.svg" />
        <img className="dock-icon w-12  p-1 hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer bg-linear-to-b from-zinc-800 to-zinc-700 rounded-xl hover:-translate-y-[30%]" src="/cli.svg" />

      </div>
    </div>
  );
};

export default Dock;
