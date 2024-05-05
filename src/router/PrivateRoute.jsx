import React from 'react'
import { Navigate,useLocation } from 'react-router-dom'

export const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('token');
    let location = useLocation();
   if(!token){return (<Navigate to={'/'} state={{ from: location}} replace={true} />)}
   return children;
}
