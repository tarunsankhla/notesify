import { BiTrash, BiPersonHearts, BiHouseHeart, BiBoxArrowRight, BiArchive } from 'src/components/UI/Icons/Icons';
import "./AsideNavbar.css";

function AsideNavbar() {
    return (
        <div className='AsideNav'>
            <div>
                <ul>
                    <li><BiHouseHeart />Home</li>
                    <li><BiArchive />Archive</li>
                    <li><BiTrash /> Trash</li>
                    <li><BiPersonHearts />Profile</li>
                </ul>
            </div>
            <div className='aside-nav-logout'>Tarun Sankhla <BiBoxArrowRight /></div>
        </div>
    )
}

export default AsideNavbar
