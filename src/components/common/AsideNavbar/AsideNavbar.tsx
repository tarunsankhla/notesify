import {useNavigate} from 'react-router';
import {NavLink} from 'react-router-dom';
import {
    BiTrash,
    BiPersonHearts,
    BiHouseHeart,
    BiBoxArrowRight,
    BiArchive
} from 'src/components/UI/Icons/Icons';
import {useAuth} from 'src/context/AuthContext';
import {useModal} from 'src/context/ModalProvider';
import {ROUTE_PATH_ArchivePage, ROUTE_PATH_LandingPage, ROUTE_PATH_TrashPage} from 'src/utils/Route';
import "./AsideNavbar.css";

function AsideNavbar() {
    let auth = useAuth();
    let navigate = useNavigate();
    const { modalToggle, setmodalToggle } = useModal();
    
    const getActiveStyle = ({isActive}) => ({
        color: isActive ? "var(--primary-color)" : "",
        transform: isActive ? "scale(1.1)" : "",
        fontWeight: "700",
        fontSize: "1.1em",
        cursor: "pointer",
        display: "flex",
        justifyContent: "flex-start",
        gap: "1.5em",
        padding: "0.5em",
        alignItems: "center"
    })
    return (
        <div className='AsideNav'>
            <div>
                <ul>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_LandingPage}>
                            <BiHouseHeart  height="1.7em" width="1.7em"/>Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_ArchivePage}>
                            <BiArchive  height="1.7em" width="1.7em"/>
                            Archive
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_TrashPage}>
                            <BiTrash  height="1.7em" width="1.7em"/>
                            Trash
                        </NavLink>
                    </li>
                    <li onClick={
                        () => {
                            console.log("login");
                            setmodalToggle(true);
                        }
                    }>
                        <BiPersonHearts  height="1.7em" width="1.7em"/>Profile
                    </li>
                </ul>
            </div>
            <div className='aside-nav-logout'>
                { auth.user ? "@" + auth.user?.firstName + auth.user?.lastName : ""}
                <span className='logout-btn'
                    onClick={
                        () => {
                            auth.logoutUser(() => {
                                navigate("/");
                            })
                        }
                }>
                    <BiBoxArrowRight/>
                </span>
            </div>
        </div>
    )
}

export default AsideNavbar
