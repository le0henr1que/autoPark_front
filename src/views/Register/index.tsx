import { FormEvent, useEffect, useState } from 'react'
import { MagnifyingGlass, Funnel, CaretLeft , CaretRight  } from "phosphor-react";
import Header from '../../components/Header';
import Load from '../../components/load';

import CardBuy from "../../components/CardBuyCar"

import '../../input.css';
import api from '../../Services/api';
import { useAuth } from '../../Providers/auth';
import { useNavigate } from 'react-router';

interface Login {
    email:string, 
    password:string,
}



function Register() {
    const {token, setToken}:any = useAuth();
    // const user = useAuth
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>();

    async function handleRegister(event: FormEvent){
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        console.log(data.email)
  
        try{
            await api.post(`/register/user`, {
            "email": data.email,
            "password": data.senha,
            "name": data.name,
           
          }).then(response => {
            setLoading(false)
            navigate('/sellCar')
          }).catch(error => {
            console.log(error.response.status)
            if(error.response.status !== 200){
                setLoading(false)
                setMessage("Dados Invalidos")
            }
        })
         
        }catch(err){
          console.log(err)
          setLoading(false)
          setMessage("Ocorreu um erro inesperado para logar")

  
        }
      }

  return  (
     <>
        <div className='w-[100%] h-screen bg-[#FFFF] flex justify-center items-center'>
            <div className="w-[541px] h-screen bg-white flex justify-center items-center">
                
                <div className='flex flex-col justify-center h-[620px] items-center shadow-2xl rounded-[10px] border-[#B9B8B7] p-[40px]'>


                    <h1 className="text-[#1B2828] text-[24px] font-bold float-right ">Criar uma conta Auto<span className="text-[#E1861B]">Park</span></h1>
                    <h1 className="text-[#1b2828e9] text-[14px] font-light float-right mt-[5px]">Insira seus dados e anuncie seu veículo gratuitamente.</h1>


                    <div className='mt-[10px]'>
                    <form onSubmit={handleRegister} className='mt-8 flex flex-col gap-4'>
                        <div className="mb-1">
                            <label  className="block mb-2 text-sm font-medium text-[#1E1A17] ">Nome</label>
                            <input id='name' name="name" className="border border-[#B9B8B7] w-[425px] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center" type="text" placeholder="Digite seu nome completo"/>
                        </div>   
                        <div className="mb-1">
                            <label  className="block mb-2 text-sm font-medium text-[#1E1A17] ">Email</label>
                            <input id='email' name="email" className="border border-[#B9B8B7] w-[425px] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center" type="text" placeholder="Digite seu email"/>
                        </div>   
                        <div className="mb-4 mt-[0px]">
                            <label  className="block mb-2 text-sm font-medium text-[#1E1A17] ">Senha</label>
                            <input id='senha' name="senha" className="border border-[#B9B8B7] w-[425px] h-[48px] rounded-[8px] p-[16px] flex flex-row items-center" type="password" placeholder="Digite sua senha"/>
                           
                        </div>    
                        {message}
                        <div className='mt-[8px] flex-col flex justify-center w-[100%] items-center'>
                            
                            <button type="submit" className={`text-black bg-[#E1861B] text-[#FFF] tracking-letterButton font-normal w-full h-[48px] text-sm flex justify-center items-center rounded-[4px] `}>
                               {loading == false ? "Cadastrar" : <Load/>}
                            </button> 

                            <h1 className="text-[#424141] text-[13px] float-right mt-[5px] mt-[32px] mb-[10px]">Já possui uma conta?<a href="/login" className="text-[#E1861B]"> Login </a></h1>

                         
                        </div>
                    </form>
                      
                    </div>

                </div>
            </div>
        </div>
     
         
    </>
  )
}

export default Register
