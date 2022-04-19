import React from 'react'
import { Outlet } from 'react-router'
// import {Footer} from './components/Footer/Footer'
// import {Navbar} from './components/Navbar/Navbar'
import { VAR_ENCODE_TOKEN, VAR_USER_ID } from './utils/Route';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import AsideNavbar from './components/common/AsideNavbar/AsideNavbar';

function Main() {
    var token = localStorage.getItem(VAR_ENCODE_TOKEN);
    var userID = localStorage.getItem(VAR_USER_ID);
    return (
        <>
            <div className='main-container'>
                <Navbar />
                <div className='main-body'>
                    <AsideNavbar />
                    <Outlet />   
                    <ToastContainer style={{ fontSize: "1.5em" }} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Main