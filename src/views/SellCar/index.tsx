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




function SellCar() {

  return  (
     <>
        <Header />
        <div className='w-full flex justify-center'>
            <div className='w-[1185px]  mt-[32px]'>

              
            </div>
        </div>
        <div className='flex w-full justify-center mt-[100px] bg-[#1E1A17]'>
          <img src="/Footer.svg"/>
        </div>
    </>
  )
}

export default SellCar
