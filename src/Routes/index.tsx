import React from 'react'

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthProvider} from "../Providers/auth";

import Home from "../views/HomePage/index";
import Login from "../views/Login/index";
import Catalogo from "../views/Catalogo/index";
import SellCar from "../views/SellCar/index";
import Dashboard from "../views/Dashboard/index";
import VerifyAuthenticToken from './verifyAuthenticToken';
import PrivateRoute from './privateRoute';
// import AuthProvider from "../Providers/Auth";


export interface RoutProps {
}
const Rout: React.FunctionComponent<RoutProps> = (props) =>{
    return (
        <BrowserRouter>
        <AuthProvider>
            <Routes>
              <Route  path="/" element={<Home/>} />
              <Route  path="/Login" element={<VerifyAuthenticToken Component={Login}/>} />
              <Route  path="/Catalogo" element={<Catalogo/>} />
              <Route  path="/SellCar" element={<PrivateRoute Component={SellCar}/>} />
              <Route  path="/Dashboard" element={<PrivateRoute Component={Dashboard} />} />
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    )
}

export default Rout