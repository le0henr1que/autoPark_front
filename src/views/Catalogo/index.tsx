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
  const [dataLength, setDataLength] = useState<number>();
  const [quantPagination, setQuantPagination] = useState<number[]>([]);
  const [pill, setPill] = useState<String[]>([])
  const [filterField, setFilterField] = useState<String[]>([])

  var staateFilters = ["São Paulo - SP", "Guarulhos - SP", "Belo Horizonte - MG", "Rio de Janeiro - RJ"];

  var yearFilter = [];

  for(var y = 2017; y < 2023; y++){
    yearFilter.push(y)
  }

  const handlePill = (value:any, category:any) => {

    if (pill.hasOwnProperty(category)) {
      pill[category] = value;
    } else {
      pill[category] = value;
    }
    console.log(pill)

    listCardCar(`pageSize=12&page=1`)
  }
  
  const handlePagination = (index:number) => {
    if(index == 0){
      listCardCar("pageSize=12&page=1")
    }else{
      listCardCar(`pageSize=12&page=${index * 12}`)
    }
    setFilteredResults([])
    window.scrollTo(40, 0);
    setLoad(true)
  }

  const listCardCar = (queryPagination) => {
    api.get(`/list/auto?${queryPagination}`)
    .then((response) =>{
      console.log(response.data.Cars.count)
      
      setFilteredResults(response.data.Cars.listCar)
      setCatalogoList(response.data.Cars.listCar)
      setDataLength(response.data.Cars.count)
      
      var dataLenghtResult =  Math.round(response.data.Cars.count / 12)

      let dataCar = [];
      for (let i = 0; i < dataLenghtResult; i++) {
        dataCar.push(i);
      }
     
      setQuantPagination(dataCar)

      setLoad(false)
    })
    .catch((error) => {
      console.log("[ERROR LIST] "+ error)
    })
  }
  useEffect(() => {
    listCardCar(`pageSize=12&page=1`)
      
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
  console.log(quantPagination)

  return  (
     <>
        <Header />
        <div className='w-full flex justify-center'>
            <div className='w-[1185px]  mt-[32px]'>

              <div className='flex justify-between items-center mb-[40px]'>
                <div className='w-[521px] leading-3'>
                  <h1 className='leading-[116%] text-[#1E1A17] font-extrabold text-[18px] mt-[-10px]'>Encontramos <span className='text-[#E1861B]'>{dataLength} veículos</span> a partir dos filtros selecionados</h1>
                </div>
                <div className="mb-4">
                    <input className="border border-[#B9B8B7] w-[383px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" id="username" type="text" placeholder="Pesquisar" onChange={(e) => searchItems(e.target.value)}/>
                    <div className='mt-[-40px] ml-[340px]'><MagnifyingGlass size={25}/></div>
                </div>  
              </div>

              <div className='flex justify-between items-center mb-[24px]'>
                <div className='w-[521px] leading-3 flex justify-start gap-[16px] items-center'>
                  {
                   
                      
                      <div className={`gap-[12px] flex justify-around items-center  h-[36px] p-[10px] bg-[#F0F1F2] text-[14px] rounded-[38px]`} >{pill.city} <X size={16} weight="light" /></div>
                      // <div className={`gap-[12px] flex justify-around items-center  h-[36px] p-[10px] bg-[#F0F1F2] text-[14px] rounded-[38px]`} >{element.year} <X size={16} weight="light" /></div>

                   
                  }
                 
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
                    {
                      staateFilters.map((index) => (
                        <Accordion.AccordionContent className="ml-[10px] mb-[20px] whitespace-nowrap cursor-pointer mt-[20px] text-[#1E1A17]" onClick={() =>handlePill(index, "city") }>{index}</Accordion.AccordionContent>
                      ))
                    }
                   
                  </Accordion.AccordionItem>

                  <Accordion.AccordionItem value="item-2" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                    <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Ano</Accordion.AccordionTrigger>
                    {/* yearFilter */}
                    {
                      yearFilter.map((index) => (
                        <Accordion.AccordionContent className="ml-[10px] mb-[20px] whitespace-nowrap cursor-pointer mt-[20px] text-[#1E1A17]" onClick={() =>handlePill(index, "year") }>{index}</Accordion.AccordionContent>
                      ))
                    }
                    
                   
                 
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

                        {
                          quantPagination.map((index) => (
                            <div className='border w-[56px] h-[56px] rounded-[6px] flex justify-center items-center cursor-pointer' onClick={() => handlePagination(index)}>{index + 1}</div>
                          ))
                        }
                    
                          
                    
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
