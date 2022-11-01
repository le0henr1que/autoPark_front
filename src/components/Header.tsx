 import React from "react";

 import {BellSimple} from 'phosphor-react'

//  import {logo} from '/public/logo.png'


 function Header(){
    return (
        <nav className="relative flex flex-wrap items-center justify-center px-2 py-3 bg-white mb-3  h-[70px]">
            <div className="w-[1216px]">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between mt-[5px]">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <a
                    className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-slate-800"
                    href="/"
                    >
                        <img src="/logo.png" className="w-[174px] h-[27px ]"/>
                    </a>
                </div>
                <div className="gap-[32px] p-0 flex flex-row">
                    <a className="text-sm font-normal leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-[#E1861B]" href="/">
                        <h1>Home</h1>
                    </a>
                    <a className="text-sm font-normal leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-[#6B7280]" href="/Catalogo">
                        <h1>Comprar Carro</h1>
                    </a>
                    <a className="text-sm font-normal leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-[#6B7280]" href="/">
                        <h1>Vender Carro</h1>
                    </a>
                    <a className="text-sm font-normal leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-[#6B7280]" href="/">
                        <h1>App Auto Car</h1>
                    </a>
                    <a className="text-sm font-normal leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-[#6B7280]" href="/">
                        <h1>Sobre nós</h1>
                    </a>
                </div>
                <div className="flex gap-[8px] p-0  flex-row ">
                    <a className="text-sm font-semibold tracking-letterButton leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-[#1E1A17;]" href="/">
                        <h1>Cadastre-se</h1>
                    </a>
                    <a href="/Login">
                        <button className={`tracking-letterButton text-white font-semibold w-[92px] h-[40px] text-sm flex flex-row justify-center items-center p-[8px 24px] gap-[10px] bg-[#E1861B] rounded-[4px]`}>
                            Login
                        </button>
                    </a>  
                </div>
                </div>
            </div>
        </nav>
    )
 }

 export default Header