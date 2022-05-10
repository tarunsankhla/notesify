import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from 'src/context/AuthContext';
import { VAR_USER_DETAILS } from 'src/utils/Route';
import "./ProfilePage.css";

type Props = {};

	
const ProfileDetails = (state, action) => {
    console.log(state, action);
    console.log(action.email, action.firstName, action.lastName)
    if (action.email === "" || action.email) {
        return {
            ...state,
            email: action.email
        }
    }
    if (action.firstName) {
        return {
            ...state,
            firstName: action.firstName
        }
    }
    if (action.lastName) {
        return {
            ...state,
            lastName: action.lastName
        }
    }
    return {
        ...state
    }
}


const ProfilePage = (props: Props) => {
    const {user, loginUser, logoutUser, userState, userDispatch} = useAuth();
    const [editON, setEditON] = useState(false);
    const [state, dispatch] = useReducer(ProfileDetails, {
        email: "",
        firstName: "",
        lastName: ""
    });
  
  useEffect(() => { 
    console.log(userState,userState?.firstName, typeof userState);
    dispatch({ firstName: userState?.firstName })
    dispatch({lastName: userState?.lastName})
      dispatch({ email: userState?.email });
  }, [])
    
  const UpdatedProfile = () => { 
    let userDetails = { email: state.email, firstName: state.firstName, lastName: state.lastName };
    localStorage.setItem(VAR_USER_DETAILS, JSON.stringify(userDetails));
    userDispatch(userDetails);
    setEditON(false);
    // Toast("success","User Details Updated")
  }
  return (
    <div className='profile-page'>
            <div className='profile-img-container'> {" "}
                {
                user && (
                    <div className="profile-initials">
                        {
                        userState?.firstName[0]?.toString().toUpperCase() || ""
                    }
                        {
                        userState?.lastName[0]?.toString().toUpperCase() || ""
                    } </div>
                )
            }
                {" "} </div>
            <div className='profile-content-container'>
                <label>
                <span>First Name: </span>
                    <input placeholder='name'
                        value={
                            state.firstName
                        }
                        disabled={
                            !editON
                        }
                        onChange={
                            (e) => dispatch({firstName: e.target.value})
                        }/></label>
            </div>

            <div  className='profile-content-container'>
                <label>
                <span>Last Name:</span>
                    <input placeholder='name'
                        value={
                          state.lastName
                        }
                        onChange={
                            (e) => dispatch({lastName: e.target.value})
                        }
                        disabled={
                            !editON
                        }/></label>
            </div>


            <div  className='profile-content-container'>
                <label>
                    <span>Email : </span>
                    <input placeholder='name'
                        value={
                          state.email
                        }
                        onChange={
                            (e) => dispatch({email: e.target.value})
                        }
                        disabled={
                            !editON
                        }/></label>
            </div>
            <div className='profile-card-footer'>
                <button onClick={
                        () => {
                            console.log(editON);
                            setEditON(true)
                        }}
                    style={{
                            visibility: editON ? "hidden" : "visible"
                        }}>
                  Edit
                </button>
          <button
            onClick={() => { 
              UpdatedProfile()
            } }style={{
                        visibility: !editON ? "hidden" : "visible"
                    }}>
                  Save
                </button>
            </div>
        </div>
  )
}

export default ProfilePage