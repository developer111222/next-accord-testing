import React from 'react';
import { GoArrowUpRight } from "react-icons/go";

const ProductLink = () => {
    return (
        <div className='max-w-5xl mx-auto p-2 '>
            <div className="flex flex-row my-10 p-2 md:p-5 lg:p-5 items-center rounded-full border-2 border-white">
                <div className="flex-1">
                    <h2 className='text-white lg:text-6xl md:text-6xl sm:text-4xl bold '>Our Product</h2>
                </div>
                <div className="flex-1 ">



                    <div className='bg-black p-2 rounded-full border-2 border-white justify-self-end w-fit animate-bounce'>
                        <a href='/product'><GoArrowUpRight className="text-white lg:w-12 lg:h-12 md:w-12 md:h-12 sm:w-15 sm:h-15 " /></a>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ProductLink