import React from "react";
import { Navigate } from 'react-router-dom'
import {useAuth} from '../Providers/auth'

const PrivateRoute = ({Component}) => {
    const recoveredToken = localStorage.getItem('token')
    return (
    
        !recoveredToken ? <Navigate to="/Login" /> : <Component />

        )
    };
    export default PrivateRoute