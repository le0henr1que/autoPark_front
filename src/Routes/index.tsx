import React from 'react'

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthProvider} from "../Providers/auth";

import Home from "../views/HomePage/index";
import Login from "../views/Login/index";
import Catalogo from "../views/Catalogo/index";
import SellCar from "../views/SellCar/index";
import Register from "../views/Register/index";
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
              <Route  path="/login" element={<VerifyAuthenticToken Component={Login}/>} />
              <Route  path="/sellCar" element={<PrivateRoute Component={SellCar}/>} />
              <Route  path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />

              <Route  path="/" element={<Home/>} />
              <Route  path="/register" element={ <Register/>} />
              <Route  path="/catalogo" element={<Catalogo/>} />
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    )
}

export default Rout