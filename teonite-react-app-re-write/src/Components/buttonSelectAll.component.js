import React from 'react';

function ButtonSelectAllUsers(props) {
/*
* click handler lifts up state from the button to higher component's state (Main)
*/
  const handleClick = event => {
    event.preventDefault();
    props.onSelectAllUsersClick();
  };

  return(
    <button onClick = {handleClick}>Select All Authors</button>
  );
}

export default ButtonSelectAllUsers;