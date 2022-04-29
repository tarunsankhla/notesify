import { createContext, useContext, useState } from "react";
import { AuthProvider } from "src/utils/Auth";

interface AuthContextInterface {
    user: any,
    loginUser: (user: any, callback: VoidFunction) => void,
    logoutUser: (callback: VoidFunction) => void,
    // showState: any
}

const AuthenticationContext = createContext<AuthContextInterface>(null!);

function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    let [user, setuser] = useState<any>(null);
    // const [s]

    let loginUser = (newUser: any, callback: VoidFunction) => {
        return AuthProvider.loginAuthProvider(() => {
            setuser(newUser);
            callback();
        })
    }

    let logoutUser = (callback: VoidFunction) => {
        return AuthProvider.logoutAuthProvider(() => {
            callback();
        })
    }

    let value = { user, loginUser, logoutUser }
    return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;

}

export function useAuth() {
    return useContext(AuthenticationContext);
}

export { AuthenticationProvider };