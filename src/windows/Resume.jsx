import React from 'react'
import CollapseWindow from './CollapseWindow'
import resume from '../assets/Resume.pdf'

const Resume = () => {
  return (
    <>
    <CollapseWindow width='20vw' height='20vh' x='1100' y='500'>
    
        <embed className='resume object-center object-cover w-[20vw] p-1 h-[60vh] border-none overflow-hidden' src={resume}></embed>
    
    </CollapseWindow>
    </>
  )
}

export default Resume
