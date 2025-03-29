import React from 'react'

const MulticoreFlexible = () => {
  return (
  <div className=" bg-black w-full dark:border dark:border-white/[0.1] my-20 rounded-md m">

    <h2 className='text-lg md:text-7xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300'> Multicore Flexible Wire</h2>
    <h3 className='text-lg md:text-3xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300'>Specially developed dieelectric grade PVC Compound.</h3>
      {/* <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">
      High purity electrolytic grade bright annealed flexible bunched bare copper conductor according to international standards like IS-8130, BS-6360, IEC-228, VDE-0295</p> */}

    <video className="w-full h-full" autoPlay loop muted>
        <source src="/video.webm" type="video/webm" />
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>



  </div>
  )
}

export default MulticoreFlexible
