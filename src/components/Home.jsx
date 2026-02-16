import React from 'react'
import Dock from './Dock'
import Navbar from './Navbar'
import CollapseWindow from '../windows/CollapseWindow'

const Home = () => {
  return (
      <>
    <div className="w-full h-screen bg-[url('C:\Users\HP\Desktop\MAC-0S\src\public\background.jpg')] bg-cover bg-center">
      <Navbar/>
      <CollapseWindow>
      <h1>Bhaskar Mishra- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolor velit incidunt et voluptate laborum perferendis. Cumque, commodi illum. Sed esse maxime laudantium expedita excepturi magni ducimus consequuntur nemo quaerat.</h1>
      </CollapseWindow>
      <Dock/>
    </div>
    </>
  )
}

export default Home
