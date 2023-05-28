import React from 'react'

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthProvider} from "../Providers/auth";

import Home from "../views/HomePage/index";
import Login from "../views/Login/index";
import Catalogo from "../views/Catalogo/index";
import SellCar from "../views/SellCar/index";
import Detail from "../views/Detail/index";
import Register from "../views/Register/index";
import Dashboard from "../views/Dashboard/index";



export interface RoutProps {
}
const Rout: React.FunctionComponent<RoutProps> = (props) =>{
    return (
        <BrowserRouter>
            <Routes>
              <Route  path="/login" element={<Login/>} />
              <Route  path="/sellCar" element={<SellCar/>} />
              <Route  path="/dashboard" element={<Dashboard />} />
              <Route  path="/detail/:id" element={<Detail/>} />

              <Route  path="/" element={<Home/>} />
              <Route  path="/register" element={ <Register/>} />
              <Route  path="/catalogo" element={<Catalogo/>} />
            </Routes>
      </BrowserRouter>
    )
}

export default Rout