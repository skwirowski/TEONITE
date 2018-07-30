import React from 'react';
import {Button} from 'react-bootstrap';

import './buttonSelectAll.style.css'

function ButtonSelectAllUsers(props) {
/*
* click handler lifts up state from the button to higher component's state (Main)
*/
  const handleClick = event => {
    event.preventDefault();
    props.onSelectAllUsersClick();
  };

  return(
    <Button
      className = "select-all-button"
      bsStyle = "primary"
      onClick = {handleClick}
    >
      Select All Authors
    </Button>
  );
}

export default ButtonSelectAllUsers;