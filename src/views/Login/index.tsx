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



function Login() {
        const {token, setToken} = useAuth();
        // const user = useAuth
       
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState<string>();

    async function handleLogin(event: FormEvent){
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        console.log(data.email)
  
        try{
            await api.post(`/login`, {
            "email": data.email,
            "password": data.senha,
           
          }).then(response => {
            console.log(response)
            localStorage.setItem('token',response.data.token) 
            localStorage.setItem('user', JSON.stringify(response.data.user)) 
            setToken(response.data.token)
            setLoading(false)
            navigate('/Dashboard')
          }).catch(error => {
            console.log(error.response.status)
            if(error.response.status !== 200){
                setLoading(false)
                setMessage("Usuario ou senha invalidos")
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
                
                <div className='flex flex-col justify-center h-[687px] items-center shadow-2xl rounded-[10px] border-[#B9B8B7] p-[40px]'>

                    <img src="/Símbolo-texto-vertical.svg" className="w-[242px] h-[122px]" />

                    <div className='mt-[10px]'>
                    <form onSubmit={handleLogin} className='mt-8 flex flex-col gap-4'>
                        <div className="mb-4">
                            <label  className="block mb-2 text-sm font-medium text-[#1E1A17] ">Login</label>
                            <input id='email' name="email" className="border border-[#B9B8B7] w-[425px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" type="text" placeholder="admin@email.com"/>
                        </div>   
                        <div className="mb-4 mt-[5px]">
                            <label  className="block mb-2 text-sm font-medium text-[#1E1A17] ">Password</label>
                            <input id='senha' name="senha" className="border border-[#B9B8B7] w-[425px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" type="password" placeholder="Insira sua senha"/>
                            <h1 className="text-[#E1861B] text-[12px] float-right mt-[5px]">Esqueceu a senha</h1>
                        </div>    
                        {message}
                        <div className='mt-[10px] flex-col flex justify-center w-[100%] items-center'>
                            <button type="submit" className={`text-black bg-[#E1861B] text-[#FFF] tracking-letterButton font-normal w-full h-[56px] text-sm flex justify-center items-center rounded-[4px] `}>
                               {loading == false ? "Entrar" : <Load/>}
                            </button> 

                            <h1 className="text-[#E1861B] text-[15px] float-right mt-[5px] mt-[10px] mb-[10px]">OU</h1>

                           
                         
                        </div>
                    </form>
                    <button type="submit" className={`bg-[#FFF] text-[#E1861B] text-[15px]  border border-[#E1861B] tracking-letterButton font-normal w-full h-[56px] text-sm flex justify-center items-center rounded-[4px] `}>
                        Cadastrar
                    </button>
                    </div>

                </div>
            </div>
        </div>
     
         
    </>
  )
}

export default Login
