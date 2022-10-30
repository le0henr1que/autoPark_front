import React from "react";

import {BellSimple} from 'phosphor-react'

//  import {logo} from '/public/logo.png'


function CardCar(){
   return (
    <div className='w-[280px] h-[466px] shadow-md border rounded-[8px]'>
        <div>
        <img src="/car1.svg" className='mt-[0px] b-[0px] rounded-t-[8px]'/>
        </div>
        <div className='w-full p-[12px]'>

        <div className='flex justify-start mb-[8px]'>
            <h1 className='text-[#E1861B] text-[14px]'>São Paulo - SP</h1>
        </div>
        <div className='flex justify-start mb-[8px]'>
            <h1 className='text-[#1E1A17] text-[18px]'>Nissan March</h1>
        </div>

        <div className='flex flex-col justify-start mb-[16px]'>
            <h1 className='text-[#898E99] text-[14px]'>1.O 12V FLEX 4P MANUAL</h1>
            <h1 className='text-[#4C515B] text-[14px]'>2017 | 102.982 km</h1>
        </div>
        
        <div className='flex flex-col justify-start mb-[16px]'>
            <h1 className='text-[#898E99] text-[14px]'>Apenas</h1>
            <h1 className='text-[#E1861B] text-[28px]'>R$ 38.000</h1>
        </div>
        <button className={`mb-[24px] tracking-letterButton leading-[150%] text-[#E1861B] font-semibold w-[248px] h-[40px] text-sm flex flex-row justify-center items-center p-[8px 24px] gap-[10px] rounded-[4px] border border-[#E1861B]`}>
            Tenho interesse
        </button>  
        </div>
    </div>
   )
}

export default CardCar