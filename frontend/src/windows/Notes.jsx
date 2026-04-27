import React from 'react'
import { useProfile } from '../context/ProfileContext'
import CollapseWindow from './CollapseWindow'

const Notes = ({windowName,windowState,setWindowState,zIndex,bringToFront}) => {
  const { profile } = useProfile()

  return (
    <CollapseWindow windowName={windowName} windowState={windowState} setWindowState={setWindowState} zIndex={zIndex} bringToFront={bringToFront} height='70vh' width='45vw' x='420'>
      <div className="space-y-4 p-5 text-white">
        <h1 className="text-2xl font-semibold">{profile?.name || 'About'}</h1>
        <p className="text-sm leading-relaxed text-white/70">
          {profile?.bio || 'Create your profile to fill this About window.'}
        </p>
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill) => (
            <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </CollapseWindow>
  )
}

export default Notes
