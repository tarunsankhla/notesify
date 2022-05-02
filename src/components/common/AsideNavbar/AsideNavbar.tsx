import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { BiTrash, BiPersonHearts, BiHouseHeart, BiBoxArrowRight, BiArchive } from 'src/components/UI/Icons/Icons';
import { useAuth } from 'src/context/AuthContext';
import { useModal } from 'src/context/ModalProvider';
import { ROUTE_PATH_ArchivePage, ROUTE_PATH_LandingPage, ROUTE_PATH_TrashPage } from 'src/utils/Route';
import "./AsideNavbar.css";

function AsideNavbar() {
    let auth = useAuth();
    let navigate = useNavigate();
    const { modalToggle, setmodalToggle } = useModal();
    console.log(auth.user,auth.userState)
    return (
        <div className='AsideNav'>
            <div>
                <ul>
                    <li>
                        <NavLink to={ROUTE_PATH_LandingPage}> <BiHouseHeart />Home
                        </NavLink></li>
                    <li>
                        <NavLink to={ROUTE_PATH_ArchivePage}><BiArchive />Archive</NavLink></li>
                    <li><NavLink to={ROUTE_PATH_TrashPage}><BiTrash /> Trash</NavLink></li>
                    <li onClick={() => {
                        console.log("login");
                        setmodalToggle(true);
                    }}><BiPersonHearts />Profile</li>
                </ul>
            </div>
            <div className='aside-nav-logout'>
                { auth.user ? "@"+auth.user?.firstName  + auth.user?.lastName : "" }
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
