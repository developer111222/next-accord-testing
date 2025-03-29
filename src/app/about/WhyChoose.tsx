import React from 'react';
import { IoIosFlash } from "react-icons/io";

import {GlowingEffect} from '../../component/WhyChooseComponent'

export function WhyChoose() {
  return (
    <ul className="mx-auto grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 p-5">
    <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<IoIosFlash className="h-4 w-4 text-white dark:text-white" />}
        title="Exceptional Quality"
        description="Accords Cable ensures top-notch products with consistent, superior performance."
      />
 
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<IoIosFlash className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Cutting-Edge Innovation"
        description="Choose innovation that keeps your projects ahead with Accords Cable."
      />
 
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<IoIosFlash className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Reliability Matters"
        description="Trust us for reliable wiring solutions backed by industry-leading expertise."
      />
 
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<IoIosFlash className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Timely Deliveries"
        description="Count on us for prompt deliveries, ensuring your projects stay on schedule."
      />
 
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<IoIosFlash className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Customer-Centric Approach"
        description="Experience unmatched service with a dedicated focus on customer satisfaction."
      />
     
    </ul>
  
  );
}
 
interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}
 
const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <>
    
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white dark:text-white">
                {title}
              </h3>
              <p
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-white dark:text-neutral-400"
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
    </>
  );
};


// const WhyChoose = () => {
//   return (
//     <div className='max-w-6xl bg-black mx-auto my-20'>
//       <h2 className=" text-white md:text-4xl lg:text-5xl">YOU CAN CHOOSE US BECAUSE<br></br>
//       WE ALWAYS PROVIDE IMPORTANCE...</h2>
//       <div className="flex">
//         <div className="flex-1">
//         <IoIosFlash size={50} color='yellow'/>
//             <h3 className='text-white md:text-2xl lg:text-2xl pb-5'>Exceptional Quality</h3>
//             <p className='max-w-xl mx-auto text-sm text-white'>Accord Cables ensures top-notch products with consistent, superior performance.</p>
//         </div>
//         <div className="flex-1"></div>
//       </div>
//     </div>
//   )
// }

export default WhyChoose
