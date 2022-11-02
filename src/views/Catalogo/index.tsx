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
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState<DataCar[]>([]);
 
  // const filteredData = APIData.filter((item) => {
  //   return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
  //   })
    
  useEffect(() => {
    
      api.get(`/list/auto`)
      .then((response) =>{
        console.log(response.data)
        
        setFilteredResults(response.data.Cars)
        setCatalogoList(response.data.Cars)
        setLoad(false)
      })
      .catch((error) => {
        console.log("[ERROR LIST] "+ error)
      })
    
      
    }, [])
    
    const searchItems = (searchValue:string) => {
      setSearchInput(searchValue)
      if (searchInput !== '') {
          const filteredData = catalogoList.filter((item) => {
              return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
          })
          setFilteredResults(filteredData)
      }
      else{
          setFilteredResults(catalogoList)
      }
  }
  // catalogoList.filter(index.brand == "Fiat")
  // filter
  //  catalogoList.filter(function(catalogoList) { return catalogoList == filter })
  return  (
     <>
        <Header />
        <div className='w-full flex justify-center'>
            <div className='w-[1185px]  mt-[32px]'>

              <div className='flex justify-between items-center mb-[40px]'>
                <div className='w-[521px] leading-3'>
                  <h1 className='leading-[116%] text-[#1E1A17] font-extrabold text-[18px] mt-[-10px]'>Encontramos <span className='text-[#E1861B]'>{filteredResults.length} veículos</span> a partir dos filtros selecionados</h1>
                </div>
                <div className="mb-4">
                    <input className="border border-[#B9B8B7] w-[383px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" id="username" type="text" placeholder="Pesquisar" onChange={(e) => searchItems(e.target.value)}/>
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
                    <h1 className='leading-[116%] text-[#6B7280] font-extrabold text-[12px] ml-[5px] mb-[-20px]'>Classificar</h1>
                  </div>
                  <select className="w-[146px] h-[56px] bg-white rounded-[8px] flex flex-row items-center float-left">
                    <option>Menor preço</option>
                    <option>Maior preço</option>
                  </select>
                </div>  

              </div>

              <div className='w-full flex justify-between '>
                <div className="w-[280px] h-[616px] static mt-[-19px]">
    
                <Accordion.Root type="single" defaultValue="item-1" collapsible className="p-[20px]">
                  
                  <Accordion.AccordionItem value="item-1" className="border-t pt-[20px] ">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Estado</Accordion.AccordionTrigger>

                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer mt-[20px] text-[#1E1A17]" >São Paulo</Accordion.AccordionContent>
                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer text-[#1E1A17]">Minas Gerais</Accordion.AccordionContent>
                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer text-[#1E1A17]">Rio de Janeiro</Accordion.AccordionContent>
                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer text-[#1E1A17]">Paraná</Accordion.AccordionContent>
                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer text-[#1E1A17]">Goiás</Accordion.AccordionContent>
                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer text-[#1E1A17]">Bahia</Accordion.AccordionContent>
                    <Accordion.AccordionContent className="ml-[10px] cursor-pointer text-[#1E1A17]">Pernambuco</Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-2" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Ano</Accordion.AccordionTrigger>

                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer mt-[20px] text-[#1E1A17]">2002</Accordion.AccordionContent>
                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer mt-[20px] text-[#1E1A17]">2019</Accordion.AccordionContent>
                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer mt-[20px] text-[#1E1A17]">2020</Accordion.AccordionContent>
                    <Accordion.AccordionContent className="ml-[10px] mb-[20px] cursor-pointer mt-[20px] text-[#1E1A17]">2021</Accordion.AccordionContent>
                 
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-3" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Marca/Modelo</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-4" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Preço</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-5" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Quilometragem</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>
                       
                  <Accordion.AccordionItem value="item-6" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Cor</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-7" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Combustível</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-8" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Tipo</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-9" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Transmissão</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-10" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Status do carro</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-11" className="mt-[16px] border-t pt-[16px] text-[#1E1A17] ">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Final da placa</Accordion.AccordionTrigger>
                    <Accordion.AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </Accordion.AccordionContent>
                  </Accordion.AccordionItem>



                </Accordion.Root>


                </div>
                <div className='flex flex-wrap justify-end gap-[20px] '>
                {load == true && 
                <div className='w-full flex justify-center'>
                      <Load />
                  </div>}
                  {
                    filteredResults.map((index) => (
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
                <div className='flex ml-[500px] mt-[70px] mb-[100px]'>
                  <div className='flex justify-center gap-[16px]'>

                      <div className='border w-[56px] h-[56px] rounded-[6px] flex justify-center items-center'> {"<"} </div>
                      <div className='border w-[56px] h-[56px] rounded-[6px] flex justify-center items-center bg-[#E1861B] text-white'>1</div>
                      <div className='border w-[56px] h-[56px] rounded-[6px] flex justify-center items-center'>2</div>
                      <div className='border w-[56px] h-[56px] rounded-[6px] flex justify-center items-center'>3</div>
                      <div className='border w-[56px] h-[56px] rounded-[6px] flex justify-center items-center'>4</div>
                      <div className='border w-[56px] h-[56px] rounded-[6px] flex justify-center items-center'>5</div>
                      <div className='border w-[56px] h-[56px] rounded-[6px] flex justify-center items-center'>{">"} </div>
                  </div>
                </div>


            </div>
        </div>
        <div className='flex w-full justify-center mt-[100px] bg-[#1E1A17]'>
          <img src="/Footer.svg"/>
        </div>
    </>
  )
}

export default Catalogo
