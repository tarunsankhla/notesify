import React from 'react';
import "./Navbar.css";
import { LogoBGPNG, LogoPNG, LogoSVG, LogoWEBP1, LogoWEBP2 } from "src/assets/img/images";
import { useNavigate as Navigate } from "react-router";

function Navbar() {
  const navigate = Navigate();
  return (
    <div className='nocontent'>
      <div className='Navbar' onClick={()=>navigate("/")}>
        <img src={LogoWEBP1} loading="lazy" alt='logo' className='logo-navbar' />
        NoteStore</div>
    </div>
  )
}

export default Navbar