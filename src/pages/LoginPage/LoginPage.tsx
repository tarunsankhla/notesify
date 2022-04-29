import React from 'react'
import { FullPageModal } from 'src/components/UI/Modal/FullPageModal/FullPageModal'




function LoginPage({ props}) {
    // const { loginShow, setLoginShow } = props;
    console.log(props, typeof props);
    return (
        
            // <FullPageModal>
        <div onClick={(e) => {
            e.stopPropagation();
        }}>
            <button 
                onClick={(e) => {
                console.log("clicked on login");
                props(false);
            }}>Create account</button>
            Login PAge
            <div>
                Login PAge
                    
            </div>
                    
            <div>
                Login PAge
                    
            </div>
            <div>
                Login PAge
                    
            </div>
            <div>
                Login PAge
                    
            </div>
        </div>
            // </FullPageModal >
        
    )
}

export default LoginPage