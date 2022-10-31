import React, { FormEvent, useState } from "react";

import {BellSimple, MapPin, MapPinLine} from 'phosphor-react'
import api from "../Services/api";
import * as Dialog from '@radix-ui/react-dialog';
import Load from "./load"
import { useNavigate } from "react-router";

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

function ModalCarEdit({city, brand, model, year, km, price, name,  image, id}:DataCar){
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState(false);
    const [idCar, setIdCar] = useState<string>()
    
    const navigate = useNavigate();


    async function handleUpdate(event: FormEvent){
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        // console.log(data.email)
        const token = JSON.parse(localStorage.getItem('user')).token.token

        if(!data.localidade || !data.modelo || !data.marca || !data.detalhe || !data.ano || !data.km || !data.price ){
            setMessage("Preencha todos os campos")
            setError(true)
            setLoading(false)
            return
        }
        
          
        
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await api.put(`/update/${id}/auto`, {
                "city":data.city,
                "name":data.modelo,
                "brand":data.marca, 
                "model":data.detalhe, 
                "year":data.ano, 
                "km":data.km, 
                "price":+data.price
           
          }, config).then(async response => {

            console.log(response.data.Car._id)

            if(data.image.name){
                const header = {
                    headers: {  "Content-Type": "multipart/form-data" }
                };
            
              
                var reader = new FileReader();
                reader.readAsDataURL(data.image);
    
                    reader.onload = async function () {
    
                        await api.post(`/upload/car/${response.data.Car._id}/image`, {  
                            "image":reader.result
                        }, header).then(response => {
                            console.log(response)
                            
                        })
    
                    }
            }

            setMessage("Veiculo Atualizado com Sucesso")
            setLoading(false)
            location.reload()
            
          }).catch(error => {
            console.log(error.response.status)
            setError(true)

            if(error.response.status !== 201){
                setLoading(false)
                setMessage("Erro ao atualizar dados do veiculo")
            }

            if(error.response.status == 403){
                setLoading(false)
                navigate('/Login')
                localStorage.clear();
            }
        })
         
        }catch(err){
          console.log(err)
          setError(true)
          setLoading(false)
          setMessage("Ocorreu um erro inesperado para atualizar dados do veiculo")
        }
      }
        
      
   return (
 
        <Dialog.Root>
            <Dialog.Portal>  
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
                <Dialog.Content className='fixed w-[690px] h-[870px] bg-white  rounded-[15px] p-[50px] top-1/2 left-1/2 w-[480px] rounded-lg -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25'>
                    <Dialog.Title className='text-3xl text-black font-black'>Edite os dados do veículo</Dialog.Title>
                    <form  onSubmit={handleUpdate} className='mt-8 flex flex-col gap-4'>

                        <div className='flex justify-between gap-[32px] mb-[15px]'>
                            <div>
                                <label className="block mb-[10px] text-sm font-medium text-[#1E1A17] ">Marca*</label>
                                <input id="marca" name="marca" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" placeholder='Ex: Fiat ' defaultValue={brand}/> 
            
                            </div>
                            <div>
                                <label className="block mb-[10px] text-sm font-medium text-[#1E1A17] ">Modelo*</label>
                                <input id="modelo" name="modelo" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='Ex: Uno' defaultValue={name}/> 
                            
                        </div>
                        </div>
                    
                        <div className='flex justify-between gap-[32px] mb-[15px]'>
                            <div>
                                <label className="block mb-[10px] text-sm font-medium text-[#1E1A17] ">Detalhes do veículo*</label>
                                <input id="detalhe" name="detalhe" className="border border-[#B9B8B7] w-[592px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: 1.4 MPFI LTZ 8V FLEX' defaultValue={model}/>
                        
                            </div>
                        </div>
                        <div className='flex justify-between gap-[32px] mb-[15px]'>
                            <div>
                                <label className="block mb-[10px] text-sm font-medium text-[#1E1A17] ">Ano*</label>
                                <input id="ano" name="ano" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: 2002'defaultValue={year} />
                            </div>
                            <div>
                                <label className="block mb-[10px] text-sm font-medium text-[#1E1A17] ">localidade*</label>
                                <input id="localidade" name="localidade" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: Osasco - SP' defaultValue={city}/>
                            </div>
                        </div>
                        <div className='flex justify-between gap-[32px] '>
                            <div>
                                <label className="block mb-[10px] text-sm font-medium text-[#1E1A17] ">Valor*</label>
                                <input id="price" name="price" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" placeholder='EX: R$ 70.00' defaultValue={price}/> 
                            </div>
                            <div>
                                <label className="block mb-[10px] text-sm font-medium text-[#1E1A17] ">Quilometragem*</label>
                                <input id="km" name="km" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: 12.000 km' defaultValue={km}/> 
                                
                            </div>
                        </div>
                        <div className='w-[592px] '>
                            <div className="mb-3 w-96">
                                <label className="form-label inline-block text-gray-700">Anexar Foto</label>
                                <input id="image" name="image" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" />
                            </div>
                        </div>
                        {error == true && message  &&
                            <div className='w-full h-[56px] flex justify-center items-center bg-[#F8BFBF] text-[#D22E2E]'>
                                {message}
                            </div>}

                        <button type="submit" className={`text-black bg-[#E1861B] text-[#FFF] tracking-letterButton font-normal w-full h-[56px] text-sm flex justify-center items-center rounded-[4px]  `}>
                            {loading == false ? "Enviar" : <Load/>}
                        </button> 
                    </form>
                </Dialog.Content>       
            </Dialog.Portal>

            <Dialog.Trigger className={`mb-[24px] bg-[#E1861B] tracking-letterButton leading-[150%] text-white font-semibold w-[248px] h-[40px] text-sm flex flex-row justify-center items-center p-[8px 24px] gap-[10px] rounded-[4px] border border-[#E1861B]`}>
                Editar Dados
            </Dialog.Trigger>
        </Dialog.Root>
      
   )
}

export default ModalCarEdit