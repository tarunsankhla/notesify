import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { BiTrash, BiPersonHearts, BiHouseHeart, BiBoxArrowRight, BiArchive } from 'src/components/UI/Icons/Icons';
import { useAuth } from 'src/context/AuthContext';
import { useModal } from 'src/context/ModalProvider';
import "./AsideNavbar.css";

function AsideNavbar() {
    let auth = useAuth();
    let navigate = useNavigate();
    const { modalToggle, setmodalToggle } = useModal();
    console.log(useModal());
    return (
        <div className='AsideNav'>
            <div>
                <ul>
                    <li>
                        <NavLink to="/"> <BiHouseHeart />Home
                        </NavLink></li>
                    <li><BiArchive />Archive</li>
                    <li><BiTrash /> Trash</li>
                    <li onClick={() => {
                        console.log("login");
                        setmodalToggle(true);
                    }}><BiPersonHearts />Profile</li>
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
