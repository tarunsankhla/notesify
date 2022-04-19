import React from 'react'
import {Outlet} from 'react-router'
// import {Footer} from './components/Footer/Footer'
// import {Navbar} from './components/Navbar/Navbar'
import { VAR_ENCODE_TOKEN, VAR_USER_ID } from './utils/Route';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Main() {
    console.log("Main");
    var token = localStorage.getItem(VAR_ENCODE_TOKEN);
    var userID = localStorage.getItem(VAR_USER_ID);
    return (
        <div>
            {/* <Navbar/> */}
            <Outlet />
            <ToastContainer style={{fontSize:"1.5em"}} />
            {/* <Footer/> */}
        </div>
    )
}

export default Main