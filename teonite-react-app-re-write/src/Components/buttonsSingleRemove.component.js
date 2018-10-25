import React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import './buttonsSingleRemove.style.css';

function ButtonsSingleRemove(props) {
/*
* click handler lifts up state from the button to higher component's state (Main)
*/
  const handleClick = event => {
    event.preventDefault();
    props.onRemoveUserClick(event.currentTarget.value);
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
      <Button
        bsStyle = "info"
        bsSize = "small"
        key = {index}
        value = {user.id.value}
        onClick = {handleClick}
      >
        {lastName} {firstName}
        <span className = "glyphicon glyphicon-remove-sign"></span>
      </Button>
    );
  });

/*
* receiving active users data via props from higher component's state (Main)
*/
  const activeUsersDataArray = props.activeUsersData;

  return(
    <Grid className = "single-remove-container">
      <Row className = "show-grid">
        <Col xs = {12}>
          <div className = "single-remove-buttons">
            {renderActiveUsersButtons(activeUsersDataArray)}
          </div>
        </Col>
      </Row>
    </Grid>
  );
}

export default ButtonsSingleRemove;