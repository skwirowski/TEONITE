import React from 'react';

class SelectElements extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.props.onActiveElementsChange(event.target.value);
  };

  renderActiveElementsOptions = array => array.map((user, index) =>
    <option
      key = {index}
      value = {user.lastName + " " + user.firstName}
      id = {user.password}
    >
      {user.lastName} {user.firstName}
    </option>
  );

  render() {
    const renderedOptions = this.renderActiveElementsOptions(this.props.names);

    return(
      <select onChange = {this.handleChange}>
        <option value = "Select an Author">-- Select an Author --</option>
        {renderedOptions}
      </select>
    );
  }
}
export default SelectElements;