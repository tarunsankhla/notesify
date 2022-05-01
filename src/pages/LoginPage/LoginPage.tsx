import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import StopPropogation from "src/utils/StopPropogation";
import { Login } from "src/assets/holders/holders";
import "./LoginPage.css";
import axios from "axios";
import useAxios from "src/customhook/useAxios";
import { VAR_ENCODE_TOKEN, VAR_USER_ID } from "src/utils/Route";
import { useAuth } from "src/context/AuthContext";
import { useModal } from "src/context/ModalProvider";

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
        // email: "adarshbalika@gmail.com",
        // password: "adarshBalika123",
    }

    
    const onSubmitHandler = async () => {

        // try {
        var object = {
            "email": email,
            "password": password
        };
        var res = await fetch({
            method: "post",
            url: "/api/auth/login",
            data: object,
        });
        console.log(res);
        var token = res?.encodedToken;
        localStorage.setItem(VAR_ENCODE_TOKEN, token)
        var user = res?.foundUser;
        var userId = res.foundUser._id;
        localStorage.setItem(VAR_USER_ID, userId);
        auth.loginUser({ email: res.foundUser.email, firstName: res.foundUser.firstName, lastName: res.foundUser.lastName },
            () => { navigate((from?.pathname || ""), { replace: true }); });
        setlogin(true);
        setmodalToggle(false);
        // var res = await axios.post("/api/auth/login", object);
        
        // console.log(res);
        //     if (res.status === 200) {
        //         var token = res.data.encodedToken;
        //         localStorage.setItem(VAR_ENCODE_TOKEN, token)
        //         var user = res.data.foundUser;
        //         var userId = res.data.foundUser._id;
        //         localStorage.setItem(VAR_USER_ID, userId);
        //         userDispatch({ email: res.data.foundUser.email, firstName: res.data.foundUser.firstName, lastName: res.data.foundUser.lastName });
        //         setlogin(true);
        //         Alert("success", "SuccessFully Logged In!!");
        //         navigate(-1);
        //     } else {
        //         Alert("error", "Something went wrong!! try again.");
        //     }
        // } catch (error) { 
        //     Alert("error", "Something went wrong!! try again.");
        // }
    }
    return (

        <div className="login-body-container" onClick={(event: React.MouseEvent<HTMLElement>) => StopPropogation(event)}>
            {/* <span 
                onClick={(e) => {
                setlogin(false);
            }}>Create account</span> */}


            <img src={Login}
                className="login-logo" alt='login-logo' />
            <div className="login-container">
                <div className="title-header">
                    <div className="login-credential-container">
                        <input placeholder="Email Address - xyz@gmail.com"
                            value={email}
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
                            onClick={onSubmitHandler}>Login</button>
                    {/* </div>
                    <div className="login-btn-container"> */}
                        <button className="btn login-action-btn"
                            onClick={() => { guestUserHandler() }}>Guest User</button>
                    </div>
                    <span className="login-footer" onClick={(e) => {
                        setlogin(false);
                    }}>
                        Create New Account
                        <span className="material-icons-round">
                            navigate_next
                        </span>
                    </span>
                </div>
            </div>

        </div>

    )
}

export default LoginPage