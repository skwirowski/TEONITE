import React from 'react';

class ShowHideElements extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSelectNoneClick = this.handleSelectNoneClick.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
  }

  handleSelectNoneClick = (event) => {
    event.preventDefault();
    this.props.onShowNoneClick();
  };

  handleSelectAllClick = (event) => {
    event.preventDefault();
    this.props.onShowAllClick();
  };

  render(){
    const isClicked = this.props.isShowHideButtonClicked;

    if(isClicked) {
      return(
        <button onClick = {this.handleSelectNoneClick}>Select None</button>
      );
    }
    return(
      <button onClick = {this.handleSelectAllClick}>Select All Authors</button>
    );
  }
}
export default ShowHideElements;