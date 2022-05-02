import React from 'react';
import "./Navbar.css";
import { LogoBGPNG, LogoPNG, LogoSVG, LogoWEBP1, LogoWEBP2 } from "src/assets/img/images";

function Navbar() {
  return (
    <div className='Navbar'>
      {/* <img src={LogoSVG} />
      <img src={LogoBGPNG} />
      <img src={LogoPNG}/> */}
      <img src={LogoWEBP1} loading="lazy" alt='logo' className='logo-navbar'/>
      {/* <img src={LogoWEBP2}/> */}
      Notes</div>
  )
}

export default Navbar