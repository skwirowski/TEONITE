import React, {Fragment} from 'react';

import {config} from '../Utilities/config';
import Select from './select.component';
import ButtonsSingleRemove from "./buttonsSingleRemove.component";
import ButtonSelectAllUsers from "./buttonSelectAll.component";
import ButtonRemoveAll from "./buttonRemoveAll.component";
import Letters from './letters.component';

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      userData: [],
      activeUsers: [],
    };

    this.handleActiveUserChange = this.handleActiveUserChange.bind(this);
    this.handleRemoveUserClick = this.handleRemoveUserClick.bind(this);
    this.handleSelectAllUsersClick = this.handleSelectAllUsersClick.bind(this);
    this.handleRemoveAllUsersClick = this.handleRemoveAllUsersClick.bind(this);
  }

/*
* fetching data from https://randomuser.me/api/
* API address and specific requests are kept in config.js file
* data results are alphabetically sorted and set in the state
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
          isDataLoaded: true,
          userData: alphabeticallySortedDataResults,
        })
      })
      .catch(error => console.log('DATA FETCH ERROR', error));
  }

  sortArrayAlphabeticallyByLastName = array => {
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

/*
* Active Users Change handler receives input values from lower component (Select)
* handler checks if there's a duplicate value in activeUsers array:
*     - gets active users ids from state's active users array
*     - compares state's active users array id's with input user id
*     - compares input user id with ignored select an author option id
* if true (value is duplicated) -> returns previous state (no update)
* if false (value is unique)
*     - prepares whole input user's data object
*     - updates state with input user's data object
*     - returns updated state
*/
  handleActiveUserChange = (selectedUser) => {
    const userData = this.state.userData;
    const activeUsers = this.state.activeUsers;
    const activeUsersIds = this.getItemsIds(activeUsers);
    const ignoredOption = "select-an-author";

    const isDuplicated = (array, comparedItem) => {
      let newArray = array.filter(item => item === comparedItem);
      return newArray.length !== 0;
    };

    const addActiveUserObject = (array, comparedItem) => {
      let newObject = {};
      for(let i = 0; i < array.length; i++) {
        if(array[i].id.value === comparedItem) {
          newObject = array[i];
        }
      }
      return newObject;
    };

    if(isDuplicated(activeUsersIds, selectedUser) || selectedUser === ignoredOption) {
      this.setState(this.state.activeUsers);
    } else {
      const activeUserData = addActiveUserObject(userData, selectedUser);

      this.setState(prevState => ({
          activeUsers: [...prevState.activeUsers, activeUserData],
        })
      );
    }
  };

/*
* Remove User Click handler receives click values from lower component (ButtonsSingleRemove)
* handler removes clicked user from state's active users array:
*     - gets active users ids from state's active users array
*     - compares state's active users array id's with clicked user id
* if true (values are different from clicked one)
*     - pushes active user's data object into empty array
* if false (value is equal to clicked one)
*     - active user's data is skipped
* creates updated active users data
* updates state's active users with new array
*/
  handleRemoveUserClick = (selectedUser) => {
    const activeUsers = this.state.activeUsers;
    const activeUsersIds = this.getItemsIds(activeUsers);

    const removeItem = (array, comparedItem) => {
      let newArray = [];
      for(let i = 0; i < array.length; i++) {
        if(array[i] !== comparedItem) {
          newArray.push(activeUsers[i]);
        }
      }
      return newArray;
    };

    const updatedActiveUsersArray = removeItem(activeUsersIds, selectedUser);
    this.setState({
      activeUsers: updatedActiveUsersArray,
    });
  };

  getItemsIds = (array) => {
    let newArray = [];
    for(let i = 0; i < array.length; i++) {
      const itemId = array[i].id.value;
      newArray.push(itemId);
    }
    return newArray;
  };

/*
* Select All Users Click handler receives click values from lower component (ButtonSelectAllUsers)
* handler adds all users to state's active users array:
*     - updates state's active users array with whole state's user data array
*/
  handleSelectAllUsersClick = () => {
    const userData = this.state.userData;

    this.setState({
      activeUsers: userData,
    })
  };

/*
* Remove All Users Click handler receives click values from lower component (ButtonRemoveAll)
* handler removes all users from state's active users array:
*     - updates state's active users array with an empty array
*/
  handleRemoveAllUsersClick = () => this.setState({
    activeUsers: [],
  });

  componentDidUpdate() {

  }

  render() {
    const isDataLoaded = this.state.isDataLoaded;

    if(isDataLoaded) {

      return(
        <Fragment>
          <Select
            selectOptionsData = {this.state.userData}
            onActiveUserChange = {this.handleActiveUserChange}
          />

          <ButtonSelectAllUsers onSelectAllUsersClick = {this.handleSelectAllUsersClick} />
          <ButtonRemoveAll onRemoveAllUsersClick = {this.handleRemoveAllUsersClick} />

          <ButtonsSingleRemove
            activeUsersData = {this.state.activeUsers}
            onRemoveUserClick = {this.handleRemoveUserClick}
          />

          <Letters activeUsersData = {this.state.activeUsers} />
        </Fragment>
      );
    } else {

      return(
        <Fragment>
          <h1>Loading...</h1>
        </Fragment>
      );
    }
  }
}

export default Main;