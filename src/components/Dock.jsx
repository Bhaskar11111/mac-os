import React from "react";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Dock = ({windowState,setWindowState}) => {
 useGSAP(() => {

 gsap.from('.dockBar',{
  y:110,
  ease: "elastic.out(.7,0.5)",
  duration:2,
  stagger:true,
  opacity:0,
  rotateX: 25,
  transformOrigin:'center bottom'
 })
gsap.from('.dockBar img',{
  y:40,
  opacity:0,
  filter:'blur(30px)',
  scale:0,
  stagger:.2,
  ease:'back.out(1.5)',
  delay:.3,
  rotateX: 25,
})
});

    console.log(new Date);
    
  return (
    <div className="  flex items-center justify-center 
    p-2 absolute bottom-3 left-1/2 -translate-x-1/2 
    rounded-3xl  px-6 py-3 font-semibold  backdrop-blur-xs inset-shadow-sm inset-shadow-current/35 shadow-xl/20 text-white w-fit cursor-pointer  transition duration-300">


      <div className="dockBar flex gap-1 items-center  ">

      
         <div className="group relative dock-icon transition-all ease-in-out duration-200 hover:-translate-y-[40%] hover:scale-125">
           <img onClick={()=>setWindowState((prev)=>({...prev,github:!prev.github}))}  className=" w-12  p-1 bg-zinc-900 rounded-xl cursor-pointer" src="/github.svg" />
         
          <h1 className="text-[12px] whitespace-nowrap  hidden absolute group-hover:flex bottom- -translate-x-1/2 left-1/2">Github </h1>
       
         </div>
      
        <div className="group relative dock-icon transition-all ease-in-out duration-200 hover:-translate-y-[40%] hover:scale-125">
          <img onClick={()=>window.open('https://www.linkedin.com/in/bhaskar-mishra-59219632a?utm_source=share_via&utm_content=profile&utm_medium=member_android','_blank')} className="  w-12  bg-linear-to-b from-cyan-400 rounded-xl  to-blue-500 p-1  cursor-pointer" src="/link.svg" />
          <h1 className="text-[12px] whitespace-nowrap  hidden absolute group-hover:flex bottom- -translate-x-1/2 left-1/2">Linkedin </h1>
        </div>
        
        <div className="group hover:scale-125 hover:-translate-y-[40%] relative dock-icon transition-all ease-in-out duration-200 ">
          <img onClick={()=>window.open("mailto:bhaskarmishra911@gmail.com","_blank")} className=" w-12  bg-linear-to-b from-red-500 to-red-800 rounded-xl   cursor-pointer" src="/mail.svg" />
          <h1 className="text-[12px] whitespace-nowrap  hidden absolute group-hover:flex bottom- -translate-x-1/2 left-1/2">Mail </h1>
        </div>
       <div className="group relative dock-icon transition-all ease-in-out duration-200 hover:-translate-y-[40%] hover:scale-125">
         <img onClick={()=>setWindowState((prev)=>({...prev,notes:!prev.notes}))} className=" w-12  bg-linear-to-b from-amber-400 to-amber-600 p-1 rounded-xl  cursor-pointer rounded-xl " src="/note.svg" />
         <h1 className="text-[12px] whitespace-nowrap  hidden absolute group-hover:flex bottom- -translate-x-1/2 left-1/2">About </h1>
       </div>
        <div className="group relative dock-icon transition-all ease-in-out duration-200 hover:-translate-y-[40%] hover:scale-125">
          <img onClick={()=>setWindowState((prev)=>({...prev,resume:!prev.resume}))} className=" w-12  p-1 bg-linear-to-b from-rose-500 to-rose-900 rounded-xl  cursor-pointer" src="/pdf.svg" />
          <h1 className="text-[12px] whitespace-nowrap  hidden absolute group-hover:flex bottom- -translate-x-1/2 left-1/2">Resume </h1>
        </div>
        <div className="group relative dock-icon transition-all ease-in-out duration-200 hover:-translate-y-[40%] hover:scale-125">
          <img onClick={()=>setWindowState((prev)=>({...prev,spotify:!prev.spotify}))} className=" w-12  p-1 bg-linear-to-b from-lime-400 to-green-600 rounded-xl   cursor-pointer" src="/spotify.svg" />
          <h1 className="text-[12px] whitespace-nowrap  hidden absolute group-hover:flex bottom- -translate-x-1/2 left-1/2">Spotify </h1>
        </div>
        <div className="group relative dock-icon transition-all ease-in-out duration-200 hover:-translate-y-[40%] hover:scale-125">
          <img onClick={()=>{window.open('https://calendar.google.com/',"_blank")}} className=" w-12  p-1 bg-linear-to-b from-teal-500 to-teal-800 rounded-xl   cursor-pointer" src="/calender.svg" />
          <h1 className="text-[12px] whitespace-nowrap  hidden absolute group-hover:flex bottom- -translate-x-1/2 left-1/2">Calendar </h1>
        </div>
        <div className="group relative dock-icon transition-all ease-in-out duration-200 hover:-translate-y-[40%] hover:scale-125">
          <img onClick={()=>setWindowState((prev)=>({...prev,cli:!prev.cli}))} className=" w-12  p-1 cursor-pointer bg-linear-to-b from-zinc-800 to-zinc-700 rounded-xl " src="/cli.svg" />
          <h1 className="text-[12px] whitespace-nowrap  hidden absolute group-hover:flex bottom- -translate-x-1/2 left-1/2">CLI </h1>
        </div>

      </div>
    </div>
  );
};

export default Dock;
