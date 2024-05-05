import React from 'react'
import { Navigate } from 'react-router-dom'

export const OpenRoute = ({children}) => {
    const token = localStorage.getItem('token')
    return token === undefined ? children : (<Navigate to={'/'} replace={true} />)
}
