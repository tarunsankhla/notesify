import React from 'react';
import "./Navbar.css";
import { LogoBGPNG, LogoPNG, LogoSVG, LogoWEBP1, LogoWEBP2 } from "src/assets/img/images";

function Navbar() {
  return (
    <div className='Navbar'>
      <img src={LogoWEBP1} loading="lazy" alt='logo' className='logo-navbar' />
      Notes</div>
  )
}

export default Navbar