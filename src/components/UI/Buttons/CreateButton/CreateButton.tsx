import React from 'react'
import PropTypes from 'prop-types'
import BiPatchPlus from '../../Icons/BiPatchPlus';
import "./CreateButton.css";

function CreateButton(props) {
  return (
    <div className='create-btn'>Create Note <BiPatchPlus/></div>
  )
}

CreateButton.propTypes = {}

export default CreateButton;
