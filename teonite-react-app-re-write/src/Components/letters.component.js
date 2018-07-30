import React from 'react';
import {Grid, Row, Col, Table} from 'react-bootstrap';

import './letters.style.css';

function Letters(props) {

/*
* Prepare Display Data prepares single letters and its count to display in results table
*   - first of all function divides users password into single letters array
*   - password consists of 40-50 upper & lower case letters
*   - counts how many times character occurs in array and returns array of objects
*     { character: letter occurrence is checked,
*       count: times letter occur in an array, }
*   - checks if characters are duplicated and returns array of unique values
*   - sorts array in ascending order (by count value)
*/
  const prepareDisplayData = (array) => {

    const changeStringIntoSingleCharactersArray = array => {
      let newArray = [];

      for(let i = 0; i < array.length; i++) {
        const charactersArray = array[i].login.password.split("");

        for(let j = 0; j < charactersArray.length; j++) {
          newArray.push(charactersArray[j]);
        }
      }
      return newArray;
    };

    const characterOccurrenceCount = array => {
      let newArray = [];

      for(let i = 0; i < array.length; i++) {
        const count = array.filter(item => item === array[i]).length;
        const newObject = {
          character: array[i],
          count,
        };
        newArray.push(newObject);
      }
      return newArray;
    };

    const removeDuplicates = array => {
      let newArray = [];
      let uniqueItemsArray = [];

      for(let i = 0; i < array.length; i++) {
        if(uniqueItemsArray.indexOf(array[i].character) === -1) {
          uniqueItemsArray.push(array[i].character);
          newArray.push(array[i]);
        }
      }
      return newArray;
    };

    const sortArrayAscending = array => {
      array.sort((a, b) => {
        if(a.count > b.count) {
          return -1;
        }
        if(a.count < b.count) {
          return 1;
        }
        return 0;
      });
      return array;
    };

    const charactersArray = changeStringIntoSingleCharactersArray(array);
    const charactersCountArray = characterOccurrenceCount(charactersArray);
    const uniqueCharactersArray = removeDuplicates(charactersCountArray);
    const sortedArray = sortArrayAscending(uniqueCharactersArray);

    return sortedArray;
  };

/*
* rendering <table> row using data values passed through props.
* row includes 3 columns:
*   - ordinal number
*   - letter/character
*   - count number
*/
  const renderLettersTable = array => array.map((user, index) => {
    return(
      <tr key = {index}>
        <td>{index +1}</td>
        <td>{user.character}</td>
        <td>{user.count}</td>
      </tr>
    );
  });

/*
* receiving active users data via props from higher component's state (Main)
*/
  const activeUsersData = props.activeUsersData;
  const displayData = prepareDisplayData(activeUsersData);

  return (
    <Grid className = "letters-container">
      <Row className = "show-grid">
        <Col xs = {12}>
          <Table striped bordered condensed hover
                 className = "letters-table"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Letter</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {renderLettersTable(displayData)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Grid>
  );
}

export default Letters;