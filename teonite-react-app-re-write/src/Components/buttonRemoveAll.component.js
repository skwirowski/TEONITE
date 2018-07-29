import React from 'react';

function ButtonRemoveAll(props) {
/*
* click handler lifts up state from the button to higher component's state (Main)
*/
  const handleClick = event => {
    event.preventDefault();
    props.onRemoveAllUsersClick();
  };

  return(
    <button onClick = {handleClick}>Select None</button>
  );
}

export default ButtonRemoveAll;