import React from 'react';
import "./SignUpPage.css"

type Props = { props: any }

function SignUpPage({ props }: Props) {
  // var {setloginshow} = {props}
  console.log(props);
  // console.log(elements);
  return (
    <div onClick={(e) => e.stopPropagation()}>
      SignUpPAge
      <button onClick={() => props(true) }>login</button>
    </div>
 
  ) 
}

export default SignUpPage;