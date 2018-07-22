import React, {Fragment} from 'react';
import {config} from '../Utilities/config';
import SelectElements from "./selectElements.component";
import DisplayElements from "./displayElements.component";
import ShowHideElements from "./showHideElements";

class Stats extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      activeElements: [],
      isSelectAllClicked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleSelectNoneClick = this.handleSelectNoneClick.bind(this);
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
  - object array is sorted alphabetically using by last name by sortArrayAlphabeticallyByLastName function.
  */

  prepareDataArray = array => {
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

  /*
  ============================== Handling Option Selection ==============================
  - chosen option value is received from SelectElements Component,
  - function isDuplicated checks (filters) if chosen value occurs in activeElements state array,
  - if condition checks if isDuplicated function returns true or if chosen value is equal ignored option:
    ~ if true - handleChange function sets state to it's unchanged value,
    ~ if false - handleChange function adds new element to activeElements array.
  */

  handleChange = (selectedElement) => {
    const activeElements = this.state.activeElements;
    const ignoredOption = "Select an Author";

    if (this.isDuplicated(activeElements, selectedElement) || selectedElement === ignoredOption) {
      this.setState(this.state.activeElements);
    } else {
      this.setState(prevState => ({
          activeElements: [...prevState.activeElements, selectedElement],
        })
      );
    }
  };

  isDuplicated = (array, comparedItem) => {
    let newArray = array.filter(item => item === comparedItem);
    return newArray.length !== 0;
  };

  /*
============================== Handling Removing Selection ==============================
- clicked button value is received from displayElements Component,
- function removeElement filters activeElements state array and returns new array excluding deleted element.
*/

  handleRemoveClick = (selectedElement) => {
    const activeElements = this.state.activeElements;
    let newArray = this.removeElement(activeElements, selectedElement);

    this.setState({
      activeElements: newArray,
    });
  };

  removeElement = (array, comparedItem) => array.filter(item => item !== comparedItem);

  handleSelectAllClick = () => {
    const rawApiData = this.state.usersData;
    const completeDataArray = this.prepareDataArray(rawApiData);
    const sortedCompleteDataArray = this.sortArrayAlphabeticallyByLastName(completeDataArray);
    const allActiveElementsArray = this.selectAllElementsFromDataArray(sortedCompleteDataArray);
    this.setState({
      activeElements: allActiveElementsArray,
      isSelectAllClicked: true,
    })
  };

  selectAllElementsFromDataArray = array => {
    let completeDataArray = [];

    for(let i = 0; i < array.length; i++) {
      const firstName = array[i].firstName;
      const lastName = array[i].lastName;
      const fullName = `${lastName} ${firstName}`;

      completeDataArray.push(fullName);
    }
    return completeDataArray;
  };

  handleSelectNoneClick = () => {
    this.setState({
      activeElements: [],
      isSelectAllClicked: false,
    })
  };

  componentDidUpdate() {
    const checkAPI = () => console.log(this.state.usersData);
    checkAPI();
    const completeDataArray = this.prepareDataArray(this.state.usersData);

    console.log(completeDataArray);
    console.log(this.sortArrayAlphabeticallyByLastName(completeDataArray));
    console.log(this.state.activeElements);
    console.log(this.state.isSelectAllClicked);
  }

  render() {
    const rawApiData = this.state.usersData;
    const completeDataArray = this.prepareDataArray(rawApiData);
    const sortedCompleteDataArray = this.sortArrayAlphabeticallyByLastName(completeDataArray);

    return(
      <Fragment>
        <SelectElements
          onActiveElementsChange = {this.handleChange}
          names={sortedCompleteDataArray}
        />

        <ShowHideElements isShowHideButtonClicked = {this.state.isSelectAllClicked}
                          onShowNoneClick = {this.handleSelectNoneClick}
                          onShowAllClick = {this.handleSelectAllClick}
        />

        <DisplayElements
          activeElements = {this.state.activeElements}
          onDeleteElementClick = {this.handleRemoveClick}
        />
      </Fragment>
    );
  }
}
export default Stats;