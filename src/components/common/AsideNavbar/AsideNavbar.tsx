import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import {
    BiTrash,
    BiPersonHearts,
    BiHouseHeart,
    BiBoxArrowRight,
    BiArchive,
    BiBoxArrowInLeft,
    BiTags
} from 'src/components/UI/Icons/Icons';
import { useAuth } from 'src/context/AuthContext';
import { useModal } from 'src/context/ModalProvider';
import { ROUTE_PATH_ARCHIVEPAGE, ROUTE_PATH_HOMEPAGE, ROUTE_PATH_LABELPAGE, ROUTE_PATH_LANDINGPAGE, ROUTE_PATH_PROFILEPAGE, ROUTE_PATH_TRASHPAGE } from 'src/utils/Route';
import "./AsideNavbar.css";

const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "var(--primary-color)" : "black",
    transform: isActive ? "scale(1.1)" : "",
    fontWeight: "700",
    fontSize: "1em",
    cursor: "pointer",
    display: "flex",
    justifyContent: "flex-start",
    gap: "0.5em",
    padding: "0.5em",
    alignItems: "center"
})

function AsideNavbar() {
    let auth = useAuth();
    let navigate = useNavigate();
    const { modalToggle, setmodalToggle } = useModal();


    return (
        <div className='AsideNav'>
            <div className='AsideNav-Navbar'>
                <ul className='ul-asidenav'>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_HOMEPAGE}>
                            <BiHouseHeart height="1.5em" width="1.5em" /><p className="title-hide-responsive">Home</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_ARCHIVEPAGE}>
                            <BiArchive height="1.5em" width="1.5em" />
                            <p className="title-hide-responsive">Archive</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_LABELPAGE}>
                            <BiTags height="1.5em" width="1.5em" />
                            <p className="title-hide-responsive">Label</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_TRASHPAGE}>
                            <BiTrash height="1.5em" width="1.5em" />
                            <p className="title-hide-responsive">Trash</p>
                        </NavLink>
                    </li>
                    {
                        !auth.user ?

                            <span onClick={
                                () => {
                                    console.log("login");
                                    setmodalToggle(true);
                                }} className='create-btn' style={{ width: "100%" }}>
                                <p >Login</p>
                                <BiBoxArrowInLeft height="1.5em" width="1.5em" />
                            </span>

                            : <li>
                                <NavLink style={getActiveStyle}
                                    to={ROUTE_PATH_PROFILEPAGE}>
                                    <BiPersonHearts height="1.5em" width="1.5em" />
                                    <p className="title-hide-responsive">Profile</p>
                                </NavLink>
                            </li>
                    }
                </ul>
            </div>
            {
                auth.user ?
                    <>
                        <hr/>
                        <div className='aside-nav-logout'>
                            <p className="title-hide-responsive">{`@${auth.userState?.firstName}${auth.userState?.lastName}`} </p>
                            <span className='logout-btn'
                                onClick={
                                    () => {
                                        auth.logoutUser(() => {
                                            navigate("/");
                                        })
                                    }}>
                                <BiBoxArrowRight height="1.5em" width="1.5em" />
                            </span>
                        </div>
                    </>
                    : ""}
        </div>
    )
}

export default AsideNavbar
