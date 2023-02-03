import { FormEvent, useEffect, useState } from 'react'
import { MagnifyingGlass, Funnel, CaretLeft , CaretRight  } from "phosphor-react";
import Header from '../../components/Header';
import Load from '../../components/load';
import * as Dialog from '@radix-ui/react-dialog';
import CardEditCar from "../../components/CardEditCar"
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import '../../input.css';
import { useNavigate } from 'react-router';
import CurrencyInput from 'react-currency-input-field';

import {X} from 'phosphor-react';
// @ts-ignore
import * as Accordion from '@radix-ui/react-accordion';
import CardBuy from "../../components/CardBuyCar"
import api from "../../Services/api"
import '../../input.css';

import {Category, DataCar} from "../../@types/types"
import Alert from '../../components/Alert';

import {staateFilters, yearFilter} from "../../shared/defaultMenu"


function Dashboard() {
  
    const [catalogoList, setCatalogoList] = useState<DataCar[]>([])
    const [load, setLoad] = useState(true)
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState<DataCar[]>([]);
    const [dataLength, setDataLength] = useState<number>();
    const [quantPagination, setQuantPagination] = useState<number[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [sortElement, setSortElement] = useState<String>("sort=-1");
    
    const alert = localStorage.getItem('created')
  
    window.scrollTo(40, 0);
  
    const handleSetElement = (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.target.value == "option1" &&  setSortElement("sort=1")
      event.target.value == "option2" &&  setSortElement("sort=-1")
      setFilteredResults([])
      setLoad(true)
    }
  
    const handleFilterClick = (name:string, items:any) => {
      window.scrollTo(40, 0);
      setLoad(true)
      setFilteredResults([])
     
      let obj = {name:name, items: items}
      let duplicate = selectedCategories.find(({name}) => name == obj.name);
      if (!duplicate) {
        setSelectedCategories([...selectedCategories, obj]);
      }
  
  
    };
   
    const hendleRemoveThisElement = (name:string, items:any) => {
      setSelectedCategories(selectedCategories.filter(item => item.name !== name));
    }
    
    const handlePagination = (index:number) => {
      if(index == 0){
        listCardCar(`${sortElement}&pageSize=12&page=1`)
      }else{
        listCardCar(`${sortElement}&pageSize=12&page=${index * 12}`)
      }
      window.scrollTo(40, 0);
      setLoad(true)
      setFilteredResults([])
    }
  
    const listCardCar = (queryPagination:string) => {
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
    setTimeout(() =>{ localStorage.setItem('created', "false")}, 2000)
    useEffect(() => {
      
      var result = selectedCategories.map(content => content.name+"="+content.items).join('&');
      console.log(result)
      listCardCar(`${sortElement}&pageSize=12&page=1&${result}`)
  
        
    }, [selectedCategories, sortElement])
      
  
    return  (
       <>
          <Header />
          {alert == "true" && <Alert/> }
  
          <div className='w-full flex justify-center'>
              <div className='w-[1185px]  mt-[32px]'>
  
                <div className='flex justify-between items-center mb-[40px]'>
                  <div className='w-[521px] leading-3'>
                  {
                  load == true ? 
  
                    <div className='w-full flex justify-center'>
                        <Load />
                    </div>
                    :
                    <h1 className='leading-[116%] text-[#1E1A17] font-extrabold text-[18px] mt-[-10px]'>Encontramos <span className='text-[#E1861B]'>{dataLength} veículos</span> a partir dos filtros selecionados</h1>
  
                  }
                  </div>
                  <div className="mb-4">
                      <input className="border border-[#B9B8B7] w-[383px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" id="username" type="text" placeholder="Pesquisar" onChange={(e) => searchItems(e.target.value)}/>
                      <div className='mt-[-40px] ml-[340px]'><MagnifyingGlass size={25}/></div>
                  </div>  
                </div>
  
                <div className='flex justify-between items-center mb-[24px]'>
                  <div className='w-[521px] leading-3 flex justify-start gap-[16px] items-center'>
                    {
                        selectedCategories.map((index) => (
                          <div className={`gap-[12px] flex justify-around items-center  h-[36px] p-[10px] bg-[#F0F1F2] text-[14px] rounded-[38px]`} >
                            {index.items} 
                            <X size={16} weight="light" className="cursor-pointer" onClick={() => hendleRemoveThisElement(index.name, index.items)}/>
                          </div>
                        ))
                    }
                   
                    {selectedCategories.length !== 0 && <div className='text-[12px] cursor-pointer' onClick={() => setSelectedCategories([])}>Remover Filtros</div>}
  
                  </div>
  
                  <div className="w-[146px]">
                    <div className='w-[521px] leading-3'>
                      <h1 className='leading-[116%] text-[#6B7280] font-extrabold text-[12px] ml-[5px] mb-[-20px]'>Classificar</h1>
                    </div>
                    <select className="w-[146px] h-[56px] bg-white rounded-[8px] flex flex-row items-center float-left" onChange={handleSetElement}>
                      <option value="option2" className="cursor-pointer">Maior preço</option>
                      <option value="option1" className="cursor-pointer">Menor preço</option>
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
                          <Accordion.AccordionContent className="ml-[10px] mb-[20px] whitespace-nowrap cursor-pointer mt-[20px] text-[#1E1A17]" onClick={() =>handleFilterClick("city", index) }>{index}</Accordion.AccordionContent>
                        ))
                      }
                     
                    </Accordion.AccordionItem>
  
                    <Accordion.AccordionItem value="item-2" className="mt-[16px] border-t pt-[16px] text-[#1E1A17]">
                      <Accordion.AccordionTrigger className="cursor-pointer font-bold text-[18px] text-[#1E1A17]">Ano</Accordion.AccordionTrigger>
            
                      {
                        yearFilter.map((index) => (
                          <Accordion.AccordionContent className="ml-[10px] mb-[20px] whitespace-nowrap cursor-pointer mt-[20px] text-[#1E1A17]" onClick={() =>handleFilterClick("year", index) }>{index}</Accordion.AccordionContent>
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
                    {filteredResults.length == 0 && <p>Nenhum Veículo Encontrado</p>}
                    {
                     filteredResults.map(({_id, image, city, brand, model, year, km, price, name}) => (
                      
                      <CardEditCar  
                        _id={_id}
                        image={image}
                        city={city} 
                        brand={brand} 
                        model={model} 
                        year={year} 
                        km={km} 
                        price={price} 
                        name={name}
                        />
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

export default Dashboard
