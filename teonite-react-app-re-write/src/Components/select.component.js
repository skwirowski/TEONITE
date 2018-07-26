import React from 'react';

class Select extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleActiveUserChange = this.handleActiveUserChange.bind(this);
  }

  handleActiveUserChange = () => {};

/*
  - rendering <select> <options> using data values passed through props.
  - first letters of first and last names are capitalized
*/

  renderUsersSelectOpitons = array => array.map((user, index) => {
      const lastName = this.capitalizeFirstLetter(user.name.last);
      const firstName = this.capitalizeFirstLetter(user.name.first);

      return(
        <option
          key = {index}
          value = {lastName + " " + firstName}
          id = {user.id.value}
        >
          {lastName} {firstName}
        </option>
      );
    }
  );

  capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.substr(1);

  render() {
    const selectOptionsDataArray = this.props.selectOptionsData;

    return(
      <select>
        <option value = "Select an Author">-- Select an Author --</option>
        {this.renderUsersSelectOpitons(selectOptionsDataArray)}
      </select>
    )
  }
}
export default Select;