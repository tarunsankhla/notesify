import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import AsideNavbar from './components/common/AsideNavbar/AsideNavbar';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function Main() {
    const [loginShow, setLoginShow] = useState(true);
    return (
        <>
            <div className='main-container'>
                <Navbar />
                <div className='main-body'>
                    <AsideNavbar />
                    <span className='outlet-body'>
                        <Outlet />
                    </span>
                    {loginShow ?
                        <LoginPage props={setLoginShow} />
                        : <SignUpPage props={setLoginShow} />
                    }
                    <ToastContainer style={{ fontSize: "1.5em" }} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Main