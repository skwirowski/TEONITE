import React from 'react';

class DisplayElements extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    event.preventDefault();
    this.props.onDeleteElementClick(event.target.value);
  };

  renderActiveElementsButtons = array => array.map((user, index) =>
    <button
      key = {index}
      value = {user}
      onClick = {this.handleClick}
    >
      {user} &#10008;
    </button>
  );

  render() {
    const activeElements = this.props.activeElements;
    return(
      <div>
        {this.renderActiveElementsButtons(activeElements)}
      </div>
    )
  }
}
export default DisplayElements;