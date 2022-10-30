import { useEffect, useState } from 'react'
import { MagnifyingGlass, Funnel, CaretLeft , CaretRight  } from "phosphor-react";
import Header from '../../components/Header';
// import Load from '../../components/Load';

import CardBuy from "../../components/CardBuyCar"

import '../../input.css';





function Login() {
  
  return  (
     <>
        <div className='w-[100%] h-screen bg-[#FFFF] flex justify-center items-center'>
            <div className="w-[541px] h-screen bg-white flex justify-center items-center">
                
                <div className='flex flex-col justify-center h-[687px] items-center'>

                    <img src="/Símbolo-texto-vertical.svg" className="w-[242px] h-[122px]" />

                    <div className='mt-[72px]'>

                        <div className="mb-4">
                            <label for="first_name" class="block mb-2 text-sm font-medium text-[#1E1A17] ">Login</label>
                            <input className="border border-[#B9B8B7] w-[425px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" id="username" type="text" placeholder="admin@email.com"/>
                        </div>   
                        <div className="mb-4 mt-[22px]">
                            <label for="first_name" class="block mb-2 text-sm font-medium text-[#1E1A17] ">Password</label>
                            <input className="border border-[#B9B8B7] w-[425px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" id="username" type="text" placeholder="Insira sua senha"/>
                            <h1 className="text-[#E1861B] text-[12px] float-right mt-[5px]">Esqueceu a senha</h1>

                        </div>    
                        <div className='mt-[70px] flex-col justify-center'>
                            <button className={`text-black bg-[#E1861B] text-[#FFF] tracking-letterButton font-normal w-full h-[56px] text-sm flex justify-center items-center rounded-[4px] `}>
                                Entrar
                            </button> 

                            {/* <label class="block mb-2 text-sm font-medium text-[#1E1A17]">Ou</label>

                            <button className={`text-black bg-[#E1861B] text-[#FFF] tracking-letterButton font-normal w-full h-[56px] text-sm flex justify-center items-center rounded-[4px] `}>
                                Cadastre-se
                            </button>  */}
                        </div>
                        
                    </div>

                </div>
            </div>
            {/* <img src="/login-illustrator.svg" className="float-left w-[632px] h-[632px] mr-[170px]" /> */}
        </div>
     
         
    </>
  )
}

export default Login
