import React, { useEffect, useState } from 'react'

const DateTime = () => {
    const [time,setTime]=useState(null)
    useEffect(()=>
    {
        setInterval(()=>
        {
            setTime(new Date())
        },1000)
    })
  return (
    <>
   {time&&(
    <div className="flex">
        <h1>
    {time.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    }).replaceAll(","," ")}{", "}
    {time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false
    })}
  </h1>
    </div>
   )}
    </>
  )
}

export default DateTime
