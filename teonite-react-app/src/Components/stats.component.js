import React from 'react';
import {config} from '../Utilities/config';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      optionsSelectedValues: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchForData();
  }

  fetchForData = () => {
    const apiURL = config.apiURL;
    const results = config.numberOfResults;
    const min = config.passwordLengthMin;
    const max = config.passwordLengthMax;
    const nat = config.nationalities;

    fetch(`${apiURL}?results=${results}&password=upper,lower,${min}-${max}&nat=${nat}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          usersData: data.results,
        })
      )
      .catch(error => console.log("ERROR", error));
  };

  /*
  ============================== Preparing Users Data ==============================
  - last, first name and password strings are pulled from data array,
  - names strings first letters are capitalized by capitalizeFirstLetter function,
  - new object preparedData is created - includes properties: firstName, lastName, password,
  - new object is pushed to empty array completeDataArray,
  - this operation is done for every data array index (array.length) by for loop,
  - completeDataArray with all new objects is returned
  - object array is sorted alphabetically using by last name by sortArrayAlphabeticallyByLastName function
  */

  prepareDataArray = (array) => {
    let completeDataArray = [];
    for (let i = 0; i < array.length; i++) {
      const firstName = this.capitalizeFirstLetter(array[i].name.first);
      const lastName = this.capitalizeFirstLetter(array[i].name.last);
      const password = array[i].login.password;
      const preparedData = {
        firstName,
        lastName,
        password
      };
      completeDataArray.push(preparedData);
    }
    return completeDataArray;
  };

  capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.substr(1);

  sortArrayAlphabeticallyByLastName = (array) => {
    array.sort((a, b) => {
      const stringA = a.lastName.toUpperCase();
      const stringB = b.lastName.toUpperCase();
      if (stringA < stringB) {
        return -1;
      }
      if (stringA > stringB) {
        return 1;
      }
      return 0;
    });
    return array;
  };

  renderNamesSelectOptions = (array) => array.map((user, index) =>
    <option
      key={index}
      value={user.lastName + " " + user.firstName}
      id={user.password}
    >
      {user.lastName} {user.firstName}
    </option>
  );

  handleChange = (event) => {
    const selectedNameValue = event.target.value;

    console.log(this.isDuplicated(this.state.optionsSelectedValues, selectedNameValue));

    this.setState(prevState => ({
        optionsSelectedValues: [...prevState.optionsSelectedValues, selectedNameValue],
      })
    );

    // let isDuplicated = this.state.optionsSelectedValues.filter(item => {
    //     if (item === selectedNameId) {
    //       return true
    //     }
    //     return false
    //   });
    // console.log(isDuplicated);






    // this.setState(prevState => ({
    //     optionsSelectedValues: [...prevState.optionsSelectedValues, selectedNameValue],
    //   })
    // );
    //
    // let newArray = this.state.optionsSelectedValues.filter(item => {
    //   if ((item.lastName + " " + item.firstName) !== selectedNameValue) {
    //     return selectedNameValue
    //   }
    //   return
    // });


    // const stateArray = this.state.optionsSelectedValues;
    // let newArray = stateArray.filter(item => {
    //   if (selectedNameValue !== item.)
    // })
    //
    //
    // return [...this.state.optionsSelectedValues, selectedNameValue].filter(item => {
    //   if (item)
    // })
    //
    // if (this.state.isNameClicked) {
    //   const copiedArray = [...this.state.optionsSelectedValues];
    //   const elementIndex = copiedArray.indexOf(selectedNameValue);
    //   copiedArray.splice(elementIndex, 1);
    //   this.setState({
    //     optionsSelectedValues: copiedArray,
    //   });
    // } else {
    //
    // }

  };

  isDuplicated = (array, comparedItem) => {
    let newArray = array.filter((item) => {
      return item === comparedItem;
    });
    if (newArray.length === 0) {
      return false
    }
    return true
  };


  componentDidUpdate() {
    // const checkAPI = () => console.log(this.state.usersData);
    // checkAPI();
    // const completeDataArray = this.prepareDataArray(this.state.usersData);
    //
    // console.log(completeDataArray);
    // console.log(this.sortArrayAlphabeticallyByLastName(completeDataArray));
    console.log(this.state.optionsSelectedValues);
  }

  render() {
    const rawApiData = this.state.usersData;
    const completeDataArray = this.prepareDataArray(rawApiData);
    const sortedCompleteDataArray = this.sortArrayAlphabeticallyByLastName(completeDataArray);

    return(
      <div>
        <select onChange={this.handleChange}>
          <option></option>
          <option>Select All</option>
          {this.renderNamesSelectOptions(sortedCompleteDataArray)}
        </select>

      </div>
    );
  }
}

export default Stats;