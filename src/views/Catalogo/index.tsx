import { useEffect, useState } from 'react'
import { MagnifyingGlass, Funnel, CaretLeft , CaretRight  } from "phosphor-react";
import Header from '../../components/Header';
import {X} from 'phosphor-react';
import Load from '../../components/load';
import * as Accordion from '@radix-ui/react-accordion';


import CardBuy from "../../components/CardBuyCar"
import api from "../../Services/api"

// import img from "C:/Users/leona/Desktop/www/Desafio-Verzel/Back-End/desafio-varzel-Back-end/uploads/5d3125665b218431ea0abea4b4602dde.png"

import '../../input.css';


interface DataCar {
  city:string,
  name:string
  brand:string, 
  model:string, 
  year:string, 
  km:string, 
  price:number,
  image:string
}

function Catalogo() {

  const [catalogoList, setCatalogoList] = useState<DataCar[]>([])
  const [load, setLoad] = useState(true)
  
  
  useEffect(() => {
    
      api.get(`/list/auto`)
      .then((response) =>{
        console.log(response.data)
        
        setCatalogoList(response.data.Cars)
        setLoad(false)
      })
      .catch((error) => {
        console.log("[ERROR LIST] "+ error)
      })
    

  }, [])

  return  (
     <>
        <Header />
        <div className='w-full flex justify-center'>
            <div className='w-[1185px]  mt-[32px]'>

              <div className='flex justify-between items-center mb-[40px]'>
                <div className='w-[521px] leading-3'>
                  <h1 className='leading-[116%] text-[#1E1A17] font-extrabold text-[18px] mt-[-10px]'>Encontramos <span className='text-[#E1861B]'>120 veículos</span> a partir dos filtros selecionados</h1>
                </div>
                <div className="mb-4">
                    <input className="border border-[#B9B8B7] w-[383px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" id="username" type="text" placeholder="Pesquisar"/>
                    <div className='mt-[-40px] ml-[340px]'><MagnifyingGlass size={25}/></div>
                </div>  
              </div>

              <div className='flex justify-between items-center mb-[24px]'>
                <div className='w-[521px] leading-3 flex justify-start gap-[16px] items-center'>
                  
                  <div className='gap-[12px] flex justify-around items-center  h-[36px] p-[10px] bg-[#F0F1F2] text-[14px] rounded-[38px]'>Osasco - SP <X size={16} weight="light" /></div>
                  <div className='gap-[12px] flex justify-around items-center h-[36px] p-[10px] bg-[#F0F1F2] text-[14px] rounded-[38px]'>2019 <X size={16} weight="light" /></div>
                  <div className='text-[12px]'>Remover Filtros</div>

                </div>

                <div className="w-[146px]">
                  <div className='w-[521px] leading-3'>
                    <h1 className='leading-[116%] text-[#6B7280] font-extrabold text-[12px]'>Classificar</h1>
                  </div>
                  <select className="w-[146px] h-[56px] bg-white rounded-[8px] flex flex-row items-center float-left">
                    <option>Menor preço</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>  

              </div>

              <div className='w-full flex justify-between '>
                <div className="w-[280px] h-[616px] static border">
    
                <Accordion.Root type="single" defaultValue="item-1" collapsible >
                  
                  <Accordion.AccordionItem value="item-1">
                    <Accordion.AccordionTrigger>Is it accessible?</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-2">
                    <Accordion.AccordionTrigger>Is it unstyled?</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes. It's unstyled by default, giving you freedom over the look and feel.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-3">
                    <Accordion.AccordionTrigger>Can it be animated?</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>
                </Accordion.Root>


                </div>
                <div className='flex flex-wrap justify-end gap-[40px] '>
                {load == true && 
                <div className='w-full flex justify-center'>
                      <Load />
                  </div>}
                  {
                    catalogoList.map((index) => (
                      <CardBuy 
                        
                        image={index.image}
                        city={index.city} 
                        brand={index.brand} 
                        model={index.model} 
                        year={index.year} 
                        km={index.km} 
                        price={index.price} 
                        name={index.name}/>
                    ))
                  }
                
                </div>

              </div>


            </div>

        </div>

    </>
  )
}

export default Catalogo
