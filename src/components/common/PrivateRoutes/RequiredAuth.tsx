import React from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from 'src/context/AuthContext';

type Props = { children: JSX.Element }

function RequiredAuth({ children }: Props) {
    let location = useLocation();
    let auth = useAuth();

    if (!auth.user) { 
        return <Navigate to="/login" state={{from :location  }} replace/>    }
    return children;
}

export default RequiredAuth;