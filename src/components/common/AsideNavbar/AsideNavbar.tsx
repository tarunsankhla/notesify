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
import { ROUTE_PATH_ArchivePage, ROUTE_PATH_LabelPage, ROUTE_PATH_LandingPage, ROUTE_PATH_TrashPage } from 'src/utils/Route';
import "./AsideNavbar.css";

function AsideNavbar() {
    let auth = useAuth();
    let navigate = useNavigate();
    const { modalToggle, setmodalToggle } = useModal();

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
    return (
        <div className='AsideNav'>
            <div>
                <ul>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_LandingPage}>
                            <BiHouseHeart height="1.5em" width="1.5em" />Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_ArchivePage}>
                            <BiArchive height="1.5em" width="1.5em" />
                            Archive
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_LabelPage}>
                            <BiTags height="1.5em" width="1.5em" />
                            Label
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={getActiveStyle}
                            to={ROUTE_PATH_TrashPage}>
                            <BiTrash height="1.5em" width="1.5em" />
                            Trash
                        </NavLink>
                    </li>
                    {
                        !auth.user ?

                            <span onClick={
                                () => {
                                    console.log("login");
                                    setmodalToggle(true);
                                }} className='create-btn' style={{ width: "100%" }}>Login<BiBoxArrowInLeft height="1.5em" width="1.5em" /></span>

                            : <li onClick={
                                () => {
                                }
                            }>
                                <BiPersonHearts height="1.5em" width="1.5em" /> Profile
                            </li>
                    }
                </ul>
            </div>
            <div className='aside-nav-logout'>
                {
                    auth.user ?
                        <> {"@" + auth.userState?.firstName + auth.userState?.lastName}
                            <span className='logout-btn'
                                onClick={
                                    () => {
                                        auth.logoutUser(() => {
                                            navigate("/");
                                        })
                                    }}>
                                <BiBoxArrowRight height="1.5em" width="1.5em" />
                            </span>
                        </>
                        : ""}
            </div>
        </div>
    )
}

export default AsideNavbar
