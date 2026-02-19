import React from "react";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Dock = ({windowState,setWindowState}) => {
    console.log(new Date);
    
  return (
    <div className="  flex items-center justify-center 
    p-2 absolute bottom-3 left-1/2 -translate-x-1/2 
    rounded-3xl  px-6 py-3 font-semibold  backdrop-blur-xs inset-shadow-sm inset-shadow-current/35 shadow-xl/20 text-white w-fit cursor-pointer  transition duration-300">


      <div className="flex gap-1 items-center">

      
          <img onClick={()=>setWindowState((prev)=>({...prev,github:!prev.github}))}  className="dock-icon w-12  p-1 bg-zinc-900 rounded-xl hover:-translate-y-[30%] hover:scale-125  transition-all ease-in-out duration-200 cursor-pointer" src="/github.svg" />
      
        <img onClick={()=>window.open('https://gamma.app/docs/Hercules-A-Code-Reviewer-Web-App-Inside-a-3D-Macintosh-OS-Replica-oejq0drxt7ucp2g?mode=present#card-l7hdshmx3093c9m','_blank')} className="dock-icon w-12  bg-linear-to-b from-cyan-400 rounded-xl hover:-translate-y-[30%] to-blue-500 p-1 hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/link.svg" />
        <img onClick={()=>window.open("mailto:bhaskarmishra911@gmail.com","_blank")} className="dock-icon w-12  bg-linear-to-b from-red-500 to-red-800 rounded-xl hover:-translate-y-[30%] hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/mail.svg" />
        <img onClick={()=>setWindowState((prev)=>({...prev,notes:!prev.notes}))} className="dock-icon w-12  bg-linear-to-b from-amber-400 to-amber-600 p-1 rounded-xl  hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer rounded-xl hover:-translate-y-[30%]" src="/note.svg" />
        <img onClick={()=>setWindowState((prev)=>({...prev,resume:!prev.resume}))} className="dock-icon w-12  p-1 bg-linear-to-b from-rose-500 to-rose-900 rounded-xl hover:-translate-y-[30%] hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/pdf.svg" />
        <img onClick={()=>setWindowState((prev)=>({...prev,spotify:!prev.spotify}))} className="dock-icon w-12  p-1 bg-linear-to-b from-lime-400 to-green-600 rounded-xl hover:-translate-y-[30%] hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/spotify.svg" />
        <img onClick={()=>{window.open('https://calendar.google.com/',"_blank")}} className="dock-icon w-12  p-1 bg-linear-to-b from-teal-500 to-teal-800 rounded-xl hover:-translate-y-[30%] hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer" src="/calender.svg" />
        <img onClick={()=>setWindowState((prev)=>({...prev,cli:!prev.cli}))} className="dock-icon w-12  p-1 hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer bg-linear-to-b from-zinc-800 to-zinc-700 rounded-xl hover:-translate-y-[30%]" src="/cli.svg" />

      </div>
    </div>
  );
};

export default Dock;
