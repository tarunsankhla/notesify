import React from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from 'src/context/AuthContext';
import { useModal } from 'src/context/ModalProvider';

type Props = { children: JSX.Element }

function RequiredAuth({ children }: Props) {
    let location = useLocation();
    let auth = useAuth();
    const { modalToggle, setmodalToggle } = useModal();
    console.log(auth.user)
    if (!auth.user) {
        setmodalToggle(true);
        return <Navigate to="/home" state={{ from: location }} replace />
    }
    return children;
}

export default RequiredAuth;