"use client"
import React from "react";
import { AboutComponent } from "../../component/AboutComponent";
import VisionAndMission from "./VisionAndMission";
import WhyChoose from "./WhyChoose";



const Page = () => {
  return (
   <>
   
   <AboutComponent className="flex items-center justify-center w-full flex-col bg-black px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl text-white md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Welcome To, <br /> Accords Cable.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-white dark:text-neutral-400 text-center">
      Accords Cable, a leading cable manufacturing company, has been at the forefront of providing high-quality wiring solutions since its inception. With a commitment to innovation, reliability, and customer satisfaction, Accords Cable has become a trusted name in the industry.
      </p>

    </AboutComponent>
    <VisionAndMission/>
    <div className="max-w-6xl bg-black mx-auto ">
     <div className="my-10 flex flex-col md:flex-row">
      <h2 className='text-white md:text-4xl flex-1 p-5'>YOU CAN CHOOSE US BECAUSE<br/>
      WE ALWAYS PROVIDE IMPORTANCE...</h2>
      <p className="text-white text-sm flex-1 p-5">Accords Cable stands out as your preferred choice due to our unwavering commitment to excellence.<br/> With a focus on superior quality and customer satisfaction, we consistently deliver<br/> reliable wiring solutions that meet the highest industry standards.</p>
    </div>
    <WhyChoose/>

    </div>
   </>
  )
}

export default Page
