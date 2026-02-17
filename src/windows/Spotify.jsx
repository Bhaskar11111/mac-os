import React from 'react'
import CollapseWindow from './CollapseWindow'

const Spotify = () => {
  return (
    <>
    <CollapseWindow width='20vw'height='60vh' x='100' y='300'>
    <div className="song-window ">
        <embed className='song-embed object-center object-cover w-full border-0 overflow-hidden' data-testid="embed-embed" src="https://open.spotify.com/embed/playlist/2QnLDxeZMzIoCno54I9vKj?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></embed>
    </div>
    </CollapseWindow>
    </>
  )
}

export default Spotify
