import React from 'react';
import BiArchive from '../../UI/Icons/BiArchive';
import BiHouseHeart from '../../UI/Icons/BiHouseHeart';
import BiPersonHearts from '../../UI/Icons/BiPersonHearts';
import { BiTrash } from '../../UI/Icons/BiTrash';
import "./AsideNavbar.css";

function AsideNavbar() {
    return (
        <div className='AsideNav'>
            <div>
                <ul>
                    <li><BiHouseHeart/>Home</li>
                    <li><BiArchive />Archive</li>
                    <li><BiTrash/> Trash</li>
                    <li><BiPersonHearts />Profile</li>
                </ul>
            </div>
            <div>Tarun Sankhla</div>
        </div>
    )
}

export default AsideNavbar
