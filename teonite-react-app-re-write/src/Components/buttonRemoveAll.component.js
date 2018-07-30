import React from 'react';
import {Button} from 'react-bootstrap';

import './buttonRemoveAll.component.css';

function ButtonRemoveAll(props) {
/*
* click handler lifts up state from the button to higher component's state (Main)
*/
  const handleClick = event => {
    event.preventDefault();
    props.onRemoveAllUsersClick();
  };

  return(
    <Button
      className = "remove-all-button"
      bsStyle = "primary"
      onClick = {handleClick}
    >
      Select None
    </Button>
  );
}

export default ButtonRemoveAll;