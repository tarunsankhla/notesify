import { useNavigate } from 'react-router';
import { BiTrash, BiPersonHearts, BiHouseHeart, BiBoxArrowRight, BiArchive } from 'src/components/UI/Icons/Icons';
import { useAuth } from 'src/context/AuthContext';
import "./AsideNavbar.css";

function AsideNavbar() {
    let auth = useAuth();
    let navigate = useNavigate();
    // if (!auth.user) { 

    // }
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
            <div className='aside-nav-logout'>
                @tarunsankhla
                <span className='logout-btn' onClick={() => {
                                                auth.logoutUser(() => { navigate("/"); })
                                            }}>
                    <BiBoxArrowRight />
                </span>
            </div>
        </div>
    )
}

export default AsideNavbar
