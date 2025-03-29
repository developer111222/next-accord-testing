import React from 'react'

const WireAndCable = () => {
  return (
  <div className=" bg-black w-full dark:border dark:border-white/[0.1] rounded-md">

    <h2 className='text-lg md:text-7xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300'> wire and cable</h2>
    <h3 className='text-lg md:text-3xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300'>Ensure Electrical Safety with Confidence</h3>
      <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">
    Fireproof Your Systems with Durable PVC Cable</p>

    <video className="w-full h-full" autoPlay loop muted>
        <source src="/video.webm" type="video/webm" />
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>



  </div>
  )
}

export default WireAndCable
