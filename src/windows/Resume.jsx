import React from 'react'
import CollapseWindow from './CollapseWindow'
import resume from '../assets/Resume.pdf'

const Resume = ({windowState,setWindowState,windowName}) => {
  return (
    <CollapseWindow windowName={windowName} windowState={windowState} setWtindowState={setWindowState} x='480' y={100} width={600} height={500}>
      <div className="w-full h-full overflow-hidden">
        <embed
          src={resume}
          className="w-full h-full"
          type="application/pdf"
        />
      </div>
    </CollapseWindow>
  )
}

export default Resume
