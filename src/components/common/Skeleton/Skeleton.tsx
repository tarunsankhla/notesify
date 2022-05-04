import React from 'react';
import "./Skeleton.css";
import Skeleton from "react-loading-skeleton";

type Props = {}

const Skeletons = (props: Props) => {
  return (
    <div className='notes-skeleton-container'>
      {
        [...new Array(5)].map(()=> (
        <div className='notes-skeleton'>
          <Skeleton width={100}  baseColor='#ebab34' duration={4} />
          <Skeleton count={3} duration={4} />
          <div className='notes-skeleton-footer'>
            <Skeleton width={80} height="70%" baseColor='#ebab34' duration={4} />
            <Skeleton width={130} height="90%" baseColor="#5294e0" borderRadius="1em" highlightColor='#96c7ff' duration={4} />
          </div>
        </div>))
      }
    </div>
  )
}

export default React.memo(Skeletons);