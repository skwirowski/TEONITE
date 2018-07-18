import React from 'react';
import {config} from '../Utilities/config';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
    }
  }

  componentDidMount() {
    this.fetchForData();
  }

  fetchForData = () => {
    const apiURL = config.apiURL;
    const results = config.numberOfResults;
    const min = config.passwordLengthMin;
    const max = config.passwordLengthMax;

    fetch(`${apiURL}?results=${results}&password=upper,lower,${min}-${max}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          usersData: data.results,
        })
      )
      .catch(error => console.log("ERROR", error));
  };

  componentDidUpdate() {
    const checkAPI = () => console.log(this.state.usersData);
    checkAPI();
  }

  render() {
    return(
      <div>
        <p>{this.props.welcome}</p>
      </div>
    );
  }
}

export default Stats;