import React from 'react'
import CollapseWindow from './CollapseWindow'

const Spotify = ({windowState,setWindowState,windowName}) => {
  return (
    <>
    <CollapseWindow windowName={windowName} windowState={windowState} setWtindowState={setWindowState}  x='450' y='170' h={80} >
    <div className="song-window ">
        <embed className='song-embed object-center object-cover w-full h-[80vh] border-0 overflow-hidden' data-testid="embed-embed" src="https://open.spotify.com/embed/playlist/2QnLDxeZMzIoCno54I9vKj?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></embed>
    </div>
    </CollapseWindow>
    </>
  )
}

export default Spotify
