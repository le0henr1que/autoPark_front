import React from "react";
import { Navigate } from 'react-router-dom'
import {useAuth} from '../Providers/auth'

const PrivateRoute = ({Component}:any) => {
    const recoveredToken = localStorage.getItem('token')
    return (
    
        ! recoveredToken? <Navigate to={`/Login?redirect=${window.location.pathname.replace("/", "")}`} /> : <Component />

        )
    };
    export default PrivateRoute