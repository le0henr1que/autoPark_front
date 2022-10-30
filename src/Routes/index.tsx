import React from 'react'

import { BrowserRouter, Route, Routes} from 'react-router-dom'
// import {AuthProvider} from "../providers/auth";

import Task from "../views/HomePage/index"
import Login from "../views/Login/index"
import Catalogo from "../views/Catalogo/index"


export interface RoutProps {
}
const Rout: React.FunctionComponent<RoutProps> = (props) =>{
    return (
        <BrowserRouter>
          <Routes>
            <Route  path="/" element={<Task/>} />
            <Route  path="/Login" element={<Login/>} />
            <Route  path="/Catalogo" element={<Catalogo/>} />
          </Routes>
      </BrowserRouter>
    )
}

export default Rout