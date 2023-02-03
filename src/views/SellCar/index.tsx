import { useEffect, useState } from 'react'
import { MagnifyingGlass, Funnel, CaretLeft , CaretRight  } from "phosphor-react";
import Header from '../../components/Header';
import {X} from 'phosphor-react';
import Load from '../../components/load';
// @ts-ignore
import * as Accordion from '@radix-ui/react-accordion';
import CardBuy from "../../components/CardBuyCar"
import api from "../../Services/api"
import '../../input.css';
import {Category, DataCar} from "../../@types/types"
import CurrencyInput from 'react-currency-input-field';



function SellCar() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState(false);
  const [catalogoList, setCatalogoList] = useState<DataCar[]>([])

  // async function handleCreatedCar(event: FormEvent){

  //   event.preventDefault()
  //   setLoading(true)
  //   const formData = new FormData(event.target as HTMLFormElement)
  //   const data = Object.fromEntries(formData)
  //   // console.log(data.email)
  //   const token = JSON.parse(localStorage.getItem('user')).token.token

  
  //   if(!data.localidade || !data.modelo || !data.marca || !data.detalhe || !data.ano || !data.km || !data.price ){
  //       setMessage("Preencha todos os campos")
  //       setError(true)
  //       setLoading(false)
  //       return
  //   }
    
      

    
  //   try{
  //       const config = {
  //           headers: { Authorization: `Bearer ${token}` }
  //       };
  //       await api.post(`/create/auto`, {
  //           "city":data.localidade,
  //           "name":data.modelo,
  //           "brand":data.marca, 
  //           "model":data.detalhe, 
  //           "year":data.ano, 
  //           "km":data.km, 
  //           "price":parseInt(data.price.replace("R$", "").replace(".", ""))
       
  //     }, config).then(async response => {

  //       await response.data._id

  //       const header = {
  //           headers: {  "Content-Type": "multipart/form-data" }
  //       };

  //       console.log(response.data._id)

  //       var reader = new FileReader();
  //       reader.readAsDataURL(data.image);

  //           reader.onload = async function () {

  //               await api.post(`/upload/car/${response.data._id}/image`, {  
  //                   "image":reader.result
  //               }, header).then(response => {
  //                   console.log(response)

  //               }).catch(err => console.log(err))

  //           }

  //       await setMessage("Veiculo Criado com Sucesso")
  //       await setLoading(false)

  //       await location.reload()
        
  //     }).catch(error => {
  //       console.log(error.response.status)
  //       setError(true)

  //       if(error.response.status !== 201){
  //           setLoading(false)
  //           setMessage("Erro ao cadastrar novo veiculo")
  //       }

  //       if(error.response.status == 403){
  //           setLoading(false)
  //           navigate('/Login')
  //           localStorage.clear();
  //       }
  //   })
     
  //   }catch(err){
  //     console.log(err)
  //     setError(true)
  //     setLoading(false)
  //     setMessage("Ocorreu um erro inesperado para cadastrar novo veiculo")
  //   }
  // }
  return  (
     <>
        <Header />
        <div className='w-full flex justify-center'>
            <div className='w-[1185px]  mt-[32px]'>
            
                
                <div className='flex flex-col h-[580px] items-center shadow-2xl rounded-[10px] border-[#B9B8B7] p-[40px]'>
                  <div className='flex flex-col h-[100] w-[100%] items-center p-[10px]'>
                    
                    <h1 className="text-[#1B2828] text-[24px] font-bold float-right ">Anuncie seu <span className="text-[#E1861B]">veiculo</span></h1>
                    <h1 className="text-[#1b2828e9] text-[14px] font-light float-right mt-[5px]">Preencha os dados do seu veiculo.</h1>

                  </div>
                  <div>
                    <form className='mt-8 flex flex-col gap-4'>

                      <div className='flex justify-between mb-[10px]'>
                        <div>
                            <label className="block mb-[5px] text-sm font-medium text-[#1E1A17] ">Marca*</label>
                            <input id="marca" name="marca" className="border border-[#B9B8B7] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center" placeholder='Ex: Fiat '/> 
                        </div>
                        <div>
                          <label className="block mb-[5px] text-sm font-medium text-[#1E1A17] ">Modelo*</label>
                          <input id="modelo" name="modelo" className="border border-[#B9B8B7] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='Ex: Uno'/> 
                        </div>
                        <div>
                            <label className="block mb-[5px] text-sm font-medium text-[#1E1A17] ">Valor*</label>
                            <CurrencyInput intlConfig={{ locale: 'pt-BE', currency: 'BRL' }} id="price" name="price" className="border border-[#B9B8B7] w-[280px] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center" placeholder='EX: R$ 70.00'/> 
                        </div>
                      </div>

                     

                        <div className='flex justify-between mb-[10px]'>
                          <div>
                              <label className="block mb-[5px] text-sm font-medium text-[#1E1A17] ">Ano*</label>
                              <input id="ano" name="ano" className="border border-[#B9B8B7] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: 2002'/>
                          </div>
                          <div>
                              <label className="block mb-[5px] text-sm font-medium text-[#1E1A17] ">localidade*</label>
                              <input id="localidade" name="localidade" className="border border-[#B9B8B7] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: Osasco - SP'/>
                          </div>
                          <div>
                              <label className="block mb-[5px] text-sm font-medium text-[#1E1A17] ">Quilometragem*</label>
                              <input id="km" name="km" className="border border-[#B9B8B7] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: 12.000 km'/> 
                          </div>
                        </div>

                      <div className='flex justify-between '>
                        <div>
                          <label className="block mb-[5px] text-sm font-medium text-[#1E1A17] ">Detalhes do veículo*</label>
                          <input id="detalhe" name="detalhe" className="border border-[#B9B8B7] w-[820px] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: 1.4 MPFI LTZ 8V FLEX'/>
                        </div>
                          
                         
                      </div>

                      <div className='w-[820px] flex justify-between items-center '>
                          <div className="mb-3 w-96">
                              <label className="form-label inline-block text-gray-700">Anexar Foto</label>
                              <input id="image" name="image" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" />
                          </div>
                          <div>
                            <button type="submit" className={`text-black bg-[#E1861B] text-[#FFF] tracking-letterButton font-normal w-[100px] h-[48px] text-sm flex justify-center items-center rounded-[4px]  `}>
                              {loading == false ? "Cadastrar" : <Load/>}
                            </button> 
                          </div>

                      </div>
                      {/* {error == true && message  &&
                          <div className='w-full h-[56px] flex justify-center items-center bg-[#F8BFBF] text-[#D22E2E]'>
                              {message}
                          </div>} */}

                     

                    </form>

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

export default SellCar
