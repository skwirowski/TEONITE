import React from 'react';

function ButtonsSingleRemove(props) {
/*
* click handler lifts up state from the button to higher component's state (Main)
*/
  const handleClick = event => {
    event.preventDefault();
    props.onRemoveUserClick(event.target.value);
  };

/*
* rendering <button> using data values passed through props.
* first letters of first and last names are capitalized
*/
  const renderActiveUsersButtons = array => array.map((user, index) => {
    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.substr(1);

    const lastName = capitalizeFirstLetter(user.name.last);
    const firstName = capitalizeFirstLetter(user.name.first);

    return (
      <button
        key = {index}
        value = {user.id.value}
        onClick = {handleClick}
      >
        {lastName} {firstName}
      </button>
    );
  });

/*
* receiving active users data via props from higher component's state (Main)
*/
  const activeUsersDataArray = props.activeUsersData;

  return(
    <div>
      {renderActiveUsersButtons(activeUsersDataArray)}
    </div>
  );
}

export default ButtonsSingleRemove;