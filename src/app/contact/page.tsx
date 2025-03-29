import React from 'react';
import { TextHoverEffect } from '@/component/TextHoverEffect';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';

const Page = () => {
  return (
    <div className='max-w-6xl bg-black mx-auto'>
         <div className="h-[15rem] flex items-center justify-center">
        <TextHoverEffect text="CONTACT US" />
      </div>
      <div className="flex flex-col md:flex-row gap-10 p-5 contact-form">
        <div className="flex-1">
            <ContactForm/>
        </div>
        <div className="flex-1">
          <ContactDetails/>
        </div>
      </div>
    </div> 
  )
}

export default Page     