import React, {Fragment} from 'react';

import {config} from '../Utilities/config';
import Select from './select.component';

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      activeUsers: [],
    };
  }

/*
  - fetching data from https://randomuser.me/api/
  - API address and specific requests are kept in config.js file
  - data results are alphabetically sorted and set in the state
*/

  componentDidMount() {
    const apiURL = config.apiURL;
    const results = config.numberOfResults;
    const min = config.passwordLengthMin;
    const max = config.passwordLengthMax;
    const nationalities = config.nationalities;

    fetch(`${apiURL}?results=${results}&password=upper,lower,${min}-${max}&nat=${nationalities}`)
      .then(response => response.json())
      .then(data => data.results)
      .then(data => {
        const alphabeticallySortedDataResults = this.sortArrayAlphabeticallyByLastName(data);
        this.setState({
          userData: alphabeticallySortedDataResults,
        })
      })
      .catch(error => console.log('DATA FETCH ERROR', error));
  }

  sortArrayAlphabeticallyByLastName = (array) => {
    array.sort((a, b) => {
      const stringA = a.name.last.toUpperCase();
      const stringB = b.name.last.toUpperCase();

      if(stringA < stringB) {
        return -1;
      }
      if(stringA > stringB) {
        return 1;
      }
      return 0;
    });
    return array;
  };

  componentDidUpdate() {
    const actualStateUserData = this.state.userData;
    console.log(actualStateUserData);
  }

  render() {
    return(
      <Fragment>
        <Select selectOptionsData = {this.state.userData} />
      </Fragment>
    )
  }
}
export default Main;