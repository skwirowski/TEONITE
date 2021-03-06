import React from 'react';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

function Select(props) {
/*
* change handler lifts up state from the inputs to higher component's state (Main)
*/
  const handleChange = event => props.onActiveUserChange(event.target.value);

/*
* rendering <select> <options> using data values passed through props.
* first letters of first and last names are capitalized
*/
  const renderUsersSelectOptions = array => array.map((user, index) => {
    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.substr(1);

    const lastName = capitalizeFirstLetter(user.name.last);
    const firstName = capitalizeFirstLetter(user.name.first);

    return(
      <option
        key = {index}
        value = {user.id.value}
      >
        {lastName} {firstName}
      </option>
    );
  });

/*
* receiving API data via props from higher component's state (Main)
*/
  const selectOptionsDataArray = props.selectOptionsData;

  return(
    <FormGroup controlId = "formControlsSelect">
      <ControlLabel>Choose an Author</ControlLabel>
      <FormControl
        componentClass = "select"
        className = "form-control"
        onChange = {handleChange}
        placeholeder = "Choose an Author"
      >
        <option value = "select-an-author">-- Select an Author --</option>
        {renderUsersSelectOptions(selectOptionsDataArray)}
      </FormControl>
    </FormGroup>
  );
}

export default Select;