import React, { createContext, useContext, useReducer, useState } from "react";
import { AuthProvider } from "src/utils/Auth";
import { VAR_ENCODE_TOKEN, VAR_USER_DETAILS, VAR_USER_ID } from "src/utils/Route";

interface AuthContextInterface {
    user: any,
    loginUser: (user: any, callback: VoidFunction) => void,
    logoutUser: (callback: VoidFunction) => void,
    userState: any
}


function userCredentialHandler(state, action) {
    console.log(state, action);
    if (action.email || action.firstName || action.lastName) {
        localStorage.setItem(VAR_USER_DETAILS, JSON.stringify({
            ...state,
            email: action.email,
            firstName: action.firstName,
            lastName: action.lastName
        }))
        return {
            ...state,
            email: action.email,
            firstName: action.firstName,
            lastName: action.lastName
        }
    }
    return {
        ...state
    }
}

const AuthenticationContext = createContext<AuthContextInterface>(null!);

function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    let [user, setuser] = useState<any>(!!localStorage.getItem(VAR_USER_DETAILS) && !!JSON.parse(localStorage.getItem(VAR_USER_DETAILS) ?? ""));
    const [userState, userDispatch] = useReducer(userCredentialHandler, localStorage.getItem(VAR_USER_DETAILS) ? JSON.parse(localStorage.getItem(VAR_USER_DETAILS) ?? "") : {
        firstName: "",
        lastName: "",
        email: ""
    });

    let loginUser = (newUser: any, callback: VoidFunction) => {
        return AuthProvider.loginAuthProvider(() => {
            console.log("new User in context", newUser);
            setuser(true);
            userDispatch(newUser);
            callback();
        })
    }

    let logoutUser = (callback: VoidFunction) => {
        return AuthProvider.logoutAuthProvider(() => {
            console.log("logout")
            localStorage.removeItem(VAR_USER_DETAILS);
            localStorage.removeItem(VAR_ENCODE_TOKEN);
            localStorage.removeItem(VAR_USER_ID);
            setuser(false);
            userDispatch({firstName: " ",
            lastName: " ",
                email: " "
            });
            
            callback();
        })
    }

    let value = { user, loginUser, logoutUser, userState}
    return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;

}

export function useAuth() {
    return useContext(AuthenticationContext);
}

export default React.memo(AuthenticationProvider);