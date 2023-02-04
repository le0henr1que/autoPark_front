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
import VerifyAuthenticToken from './verifyAuthenticToken';
import PrivateRoute from './privateRoute';
import ElementAdmRoute from "./admRoute"
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
              <Route  path="/dashboard" element={<ElementAdmRoute Component={Dashboard} />} />
              <Route  path="/detail/:id" element={<PrivateRoute Component={Detail} />} />

              <Route  path="/" element={<Home/>} />
              <Route  path="/register" element={ <Register/>} />
              <Route  path="/catalogo" element={<Catalogo/>} />
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    )
}

export default Rout