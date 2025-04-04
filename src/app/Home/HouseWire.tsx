import React from 'react'

const HouseWire = () => {
  return (
  <div className=" bg-black w-full dark:border dark:border-white/[0.1] my-20 rounded-md">

    <h2 className='text-lg md:text-7xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300'>House Wire</h2>
    <h3 className='text-lg md:text-3xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300'>Ensure Electrical Safety with Confidence</h3>
      <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto pb-5">
    Fireproof Your Systems with Durable PVC Cable</p>

    <video className="w-full h-full" autoPlay loop muted>
        <source src="/house.webm" type="video/webm" />
        <source src="/house.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>



  </div>
  )
}

export default HouseWire