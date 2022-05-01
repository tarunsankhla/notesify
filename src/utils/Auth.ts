const AuthProvider = {
    isAuthenticated: false,
    loginAuthProvider(callback: VoidFunction) { 
        AuthProvider.isAuthenticated = true;
        setTimeout(callback, 500);
    },
    logoutAuthProvider(callback: VoidFunction) {
        AuthProvider.isAuthenticated = false;
        setTimeout(callback, 500);
     }
}
export { AuthProvider };