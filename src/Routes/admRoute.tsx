// import React from "react";
// import { Navigate } from 'react-router-dom'
// import { useAuth } from '../Providers/auth'

// const ElementAdmRoute = ({Component}:any) => {

//     const recoveredToken = localStorage.getItem('token')
//     const userType = JSON.parse(localStorage.getItem('user'))
//     return (
    
//         recoveredToken && userType.typeUser == "admin" ? <Component /> : <Navigate to={`/`} />

//         )
//     };

//     export default ElementAdmRoute