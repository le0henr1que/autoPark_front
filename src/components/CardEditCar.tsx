import React from "react";

import {BellSimple, MapPin, MapPinLine} from 'phosphor-react'
import api from "../Services/api";
import * as Dialog from '@radix-ui/react-dialog';
import ModalCarEdit from "./ModalEditCar"
//  import {logo} from '/public/logo.png'

export interface DataCar {
    id:string, 
    city:string,
    name:string
    brand:string, 
    model:string, 
    year:string, 
    km:string, 
    price:number,
    image:string
}

function CardEditCar({city, brand, model, year, km, price, name,  image, id}:DataCar){
    
const hendleDeleteCar = (idCar:string) => {

    const token = JSON.parse(localStorage.getItem('user')).token.token

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    api.delete(`/delete/${idCar.id}/auto`, config).then(response => {
          
    console.log(response)
    location.reload()

  }).catch(error => {
    if(error.response.status == 403){
        setLoading(false)
        navigate('/Login')
        localStorage.clear();
    }
  })
   
}

   return (
    <div className='w-[280px] h-[550px] shadow-md border rounded-[8px]'>
        <div className="mt-[0px] b-[0px] rounded-t-[8px] w-[280ox] h-[187px]">
      
        <img src={!image ? "/Frame146Error.svg" : image} className='mt-[0px] b-[0px] rounded-t-[8px]'/>
        </div>
        <div className='w-full p-[12px]'>

        <div className='flex justify-start mb-[8px] gap-[8px]'>
            <MapPin size={16} weight="fill" color={'#E1861B'} /><h1 className='text-[#E1861B] text-[14px]'>{city}</h1>
        </div>
        <div className='flex justify-start mb-[8px]'>
            <h1 className='text-[#1E1A17] text-[18px]'>{brand} {name}</h1>
        </div>

        <div className='flex flex-col justify-start mb-[16px]'>
            <h1 className='text-[#898E99] text-[14px]'>{model}</h1>
            <h1 className='text-[#4C515B] text-[14px]'>{year} | {km}</h1>
        </div>
        
        <div className='flex flex-col justify-start mb-[16px]'>
            <h1 className='text-[#898E99] text-[14px]'>Apenas</h1>
            <h1 className='text-[#E1861B] text-[28px]'>R$ {price}</h1>
        </div>
        <ModalCarEdit id={id} city={city} name={name} brand={brand} model={model} year={year} km={km} price={price} image={image}/>

        <button onClick={() => hendleDeleteCar({id})} className={`mb-[24px] tracking-letterButton leading-[150%] text-[#D22E2E] font-semibold w-[248px] h-[40px] text-sm flex flex-row justify-center items-center p-[8px 24px] gap-[10px] rounded-[4px] border border-[#D22E2E]`}>
            Excluir Cadastro
        </button>    
        </div>
    </div>
   )
}

export default CardEditCar