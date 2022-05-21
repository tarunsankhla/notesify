import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import StopPropogation from "src/utils/StopPropogation";
import { Login } from "src/assets/holders/holders";
import "./LoginPage.css";
import useAxios from "src/customhook/useAxios";
import { VAR_ENCODE_TOKEN, VAR_USER_ID } from "src/utils/Route";
import { useAuth } from "src/context/AuthContext";
import { useModal } from "src/context/ModalProvider";
import { FullPageModal } from "src/components/UI/Modal/FullPageModal/FullPageModal";
import { Toast } from "src/components/common/Toast/Toast";

interface Location {
    pathname: string;
    search: string;
    hash: string;
    state: unknown;
    key: string;
}
let location: Location;
let from: any;

function LoginPage({ props: setlogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { modalToggle, setmodalToggle } = useModal();
    const [response, error, loading, fetch] = useAxios();
    let auth = useAuth();
    const navigate = useNavigate();
    location = useLocation();
    from = location.state;  // .state?.from?.pathname || "/";


    function guestUserHandler() {
        setEmail("adarshbalika@gmail.com");
        setPassword("adarshBalika123");
        var object = {
            "email": "adarshbalika@gmail.com",
            "password": "adarshBalika123"
        };
        LoginHandler(object)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // try {
        if (email.trim() === "" || password.trim() === "") {
            // Alert("error", "Input cannot be blank");
            Toast("Input cannot be blank")
        } else {
            var object = {
                "email": email,
                "password": password
            };
            await LoginHandler(object)
        }
    }

    const LoginHandler = async (dataObject) => {
        
        try {
            var res = await fetch({
                method: "post",
                url: "/api/auth/login",
                data: dataObject,
            });
            var token = res?.encodedToken;
            localStorage.setItem(VAR_ENCODE_TOKEN, token)
            var user = res?.foundUser;
            var userId = res?.foundUser?._id;
            localStorage.setItem(VAR_USER_ID, userId);
            auth.loginUser({ email: res?.foundUser?.email, firstName: res?.foundUser?.firstName, lastName: res?.foundUser?.lastName },
                () => { navigate((from?.pathname || "/home"), { replace: true }); });
            setlogin(true);
            setmodalToggle(false);
            Toast("Logged In!");
        } catch (error) { 
            Toast(error);
            console.log(error);
        }
    }
    return (
        <FullPageModal>

            <div className="login-body-container" onClick={(event: React.MouseEvent<HTMLElement>) => StopPropogation(event)}>

                <img src={Login} className="login-logo" alt='login-logo' />

                <div className="login-container">
                    <div className="title-header">
                        
                        <form onSubmit={(e) => onSubmitHandler(e)}>
                            <div className="login-credential-container">
                                <input placeholder="Email Address - xyz@gmail.com"
                                    value={email}
                                    type="email"
                                    onChange={
                                        (e) => setEmail(e.target.value)
                                    } />
                            </div>
                            <div className="login-credential-container">
                                <input type="password" value={password} onChange={
                                    (e) => setPassword(e.target.value)}
                                    name="" placeholder="Password" id="" />
                            </div>
                            <div className="login-rem-forgetpass-container">
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    Remember me
                                </div>
                                <div className="btn-link">Forgot your password?</div>
                            </div>
                            <div className="login-btn-container">
                                <button className="btn login-action-btn"
                                    type="submit">Login</button>

                                <button className="btn login-action-btn"
                                    onClick={() => { guestUserHandler() }}>Guest User</button>
                            </div>
                            <span className="login-footer cursive" onClick={(e) => {
                                setlogin(false);
                            }}>
                                Create New Account
                                <span className="material-icons-round">
                                    navigate_next
                                </span>
                            </span>
                        </form>
                    </div>
                </div>

            </div>
        </FullPageModal>
    )
}

export default LoginPage