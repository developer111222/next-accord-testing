import React from 'react';
import { LuPhoneIncoming } from "react-icons/lu";
import { AiOutlineMail } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";

const ContactDetails = () => {
    return (
        <div className=''>
            <div className="flex flex-col justify-content-center">
                <div className='flex-1 my-5'>
                    <div className='flex flex-row bg-white rounded-full content-center items-center gap-5'>
                        <div className='bg-black rounded-full p-5 items-center border-2 border-white'>  <LuPhoneIncoming color="white" size={50} /></div>
                        <h3 className="md:text-4xl lg:text-4xl sm:text-4xl">+911234567890</h3>

                    </div>
                </div>
                <div className='flex-1 my-5'>
                    <div className='flex flex-row bg-white rounded-full border-2 border-white content-center items-center gap-5'>
                        <div className='bg-black rounded-full p-5 '>

                            <AiOutlineMail color="white" size={50} />
                        </div>
                        < h3 className='md:text-4xl lg:text-4xl sm:text-4xl'>accord_cables@ yahoo.co.in</h3>
                    </div>
                </div>
                <div className='flex-1 my-5'>
                    <div className="flex flex-row bg-white rounded-full border-2 border-white content-center items-center gap-5">
                     
                     <div className="bg-black rounded-full p-5 ">
                     <SlLocationPin color="white" size={50} />
                     </div>
<h3 className='md:text-4xl lg:text-4x1 sm:text-4xl'> Bawana Industrial Area J-98, Sec-4, Delhi-110039

</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContactDetails