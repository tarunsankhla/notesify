import React from 'react';
import "./LandingPage.css";
import { annotation } from "src/assets/holders/holders";
import { useAuth } from 'src/context/AuthContext';
import { useNavigate as Navigate } from 'react-router';
import { ROUTE_PATH_HOMEPAGE } from 'src/utils/Route';
import { useModal } from 'src/context/ModalProvider';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = Navigate();
  const { modalToggle, setmodalToggle } = useModal();
  console.log(user);
  return (
    <div className='landing-page-main-container'>
      <section>
        <p className='big-txt page-title dsg-txt '>NoteStore</p>
        <div className='landing-page-data'>
          <p className='align-start fn-wg-700 xxlg-txt gray-txt'>
            Meet your modern
          </p>
          <p className='dsg-txt xxlg-txt'>
            Note Taking App
          </p>
          <p className='gray-txt'>
            Manage your daily tasks and workflow in a modern way and boost your efficiency without any efforts.
          </p>
        </div>
        { user ?
          <button onClick={() => { 
            navigate(ROUTE_PATH_HOMEPAGE);
          }} className="btn-landing cursive">
            Take Notes
          </button> :
          <button  onClick={() => { 
            navigate(ROUTE_PATH_HOMEPAGE);
            setmodalToggle(true);
          }} className="btn-landing cursive">
            Join Now
          </button>
       }
      </section>
          <img src={ annotation} className="landing-page-img"/>
    </div>
  )
}

export default LandingPage;