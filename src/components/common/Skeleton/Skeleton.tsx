import React from 'react';
import "./Skeleton.css";
import Skeleton from "react-loading-skeleton";

type Props = {}

const Skeletons = (props: Props) => {
  return (
    <div className='notes-skeleton-container'>
      {
        [...new Array(6)].map(() => (
          <div className='notes-skeleton'>
            <Skeleton width={100} baseColor='#ebab34' duration={4} />
            <span style={{ margin: "0.5em 0" }}>
              <Skeleton count={3} duration={4} />
            </span>
            <div className='notes-skeleton-footer'>
              <Skeleton width={80} height="70%" baseColor='#ebab34' duration={4} />
              <Skeleton width={100} height="90%" baseColor="lightgray" borderRadius="1em" highlightColor='white' duration={4} />
            </div>
          </div>))
      }
    </div>
  )
}

export default React.memo(Skeletons);