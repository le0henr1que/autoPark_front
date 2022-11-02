import React from "react";

import {BellSimple, MapPin, MapPinLine} from 'phosphor-react'

//  import {logo} from '/public/logo.png'

export interface DataCar {
    city:string,
    name:string
    brand:string, 
    model:string, 
    year:string, 
    km:string, 
    price:number,
    image:string
}

function CardCar({city, brand, model, year, km, price, name,  image}:DataCar){
    function converterFloatReal(valor){
        var inteiro = null, decimal = null, c = null, j = null;
        var aux = new Array();
        valor = ""+valor;
        c = valor.indexOf(".",0);
      
        if(c > 0){
         
           inteiro = valor.substring(0,c);
           decimal = valor.substring(c+1,valor.length);
        } else{
           inteiro = valor;
        }
     

        for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
              aux[c]=inteiro.substring(j-3,j);
        }
     

        inteiro = "";
        for(c = aux.length-1; c >= 0; c--){
           inteiro += aux[c]+'.';
        }
    
     
        inteiro = inteiro.substring(0,inteiro.length-1);
     
        decimal = parseInt(decimal);
        if(isNaN(decimal)){
           decimal = "00";
        } else{
           decimal = ""+decimal;
           if(decimal.length === 1){
              decimal = "0"+decimal;
           }
        }
        valor = inteiro+","+decimal;
        return valor;
    }
    
   return (
    <div className='w-[280px] h-[466px] shadow-md border rounded-[8px]'>
        <div className="mt-[0px] b-[0px] rounded-t-[8px] w-[280ox] h-[187px]">
      
        <img src={!image ? "/Frame146Error.svg" : image} className='mt-[0px] b-[0px] rounded-t-[8px]'/>
        </div>
        <div className='w-full p-[12px] mt-[-15px]'>

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
            <h1 className='text-[#E1861B] text-[28px]'>R$ {converterFloatReal(price)}</h1>
        </div>
        <button className={`mb-[24px] tracking-letterButton leading-[150%] text-[#E1861B] font-semibold w-[248px] h-[40px] text-sm flex flex-row justify-center items-center p-[8px 24px] gap-[10px] rounded-[4px] border border-[#E1861B]`}>
            Tenho interesse
        </button>  
        </div>
    </div>
   )
}

export default CardCar