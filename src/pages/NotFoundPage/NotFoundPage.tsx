import React from 'react';
import { useNavigate as Navigate } from 'react-router';
import { ROUTE_PATH_HOMEPAGE } from 'src/utils/Route';
import { Login2 } from "src/assets/holders/holders";
import "./NotFoundPage.css";

type Props = {}

const NotFoundPage = (props: Props) => {
  const navigate = Navigate();
  return (
    <div className='notfoundpage-container'>
        <p className='page-title'>Not Found</p>
       <button className="btn-landing cursive"  onClick={() => { 
            navigate(ROUTE_PATH_HOMEPAGE);
          }}>
            Go back Home
      </button>
      <img src={Login2 } className="page-img"/>
    </div>
  )
}

export default NotFoundPage