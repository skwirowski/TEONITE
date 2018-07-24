import React from 'react';

class DisplayResultsTable extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  changeStringIntoCharacters = (array) => {
    let newArray = [];

    for(let i = 0; i < array.length; i++) {
      const charactersArray = array[i].split("");
      for(let j = 0; j < charactersArray.length; j++) {
        newArray.push(charactersArray[j]);
      }
    }
    return newArray;
  };

  preparePasswordArray = (array) => {
    let passwordArray = [];

    for(let i = 0; i < array.length; i++) {
      const singlePassword = array[i].password;
      passwordArray.push(singlePassword);
    }
    return passwordArray;
  };

  characterOccurrenceCount = (array, element) => {
    let countArray = [];

    for (let i = 0; i < element.length; i++) {
      let occurringElements = {};
      const count = array.filter(item => item === element[i]).length;
      occurringElements = {
        element: element[i],
        count,
      };
      countArray.push(occurringElements);
    }
    return countArray;
  };

  removeDuplicates = (array) => {
    let arrayOfUniqueElements = [];
    let arrayOfUniqueElementsAndCounts = [];

    for(let i = 0; i < array.length; i++) {
      if(arrayOfUniqueElements.indexOf(array[i].element) === -1) {
        arrayOfUniqueElements.push(array[i].element);
        arrayOfUniqueElementsAndCounts.push(array[i]);
      }
    }
    return arrayOfUniqueElementsAndCounts;
  };

  componentDidUpdate() {
    const activeArray = this.props.activeElements;
    const passwordArray = this.preparePasswordArray(activeArray);
    const charactersArray = this.changeStringIntoCharacters(passwordArray);
    const characterCount = this.characterOccurrenceCount(charactersArray, charactersArray);
    const removeDuplicates = this.removeDuplicates(characterCount);

    console.log(activeArray);
    console.log(charactersArray);
    console.log(characterCount);
    console.log(removeDuplicates);

  }

  renderResultsTable = array => {
    const passwordArray = this.preparePasswordArray(array);
    const charactersArray = this.changeStringIntoCharacters(passwordArray);
    const characterCount = this.characterOccurrenceCount(charactersArray, charactersArray);
    const removeDuplicates = this.removeDuplicates(characterCount);

    // const renderElements = (array) => array.map((item, index) =>
    //   <tr key = {index}>
    //     <th>{index + 1}</th>
    //     <th>{item.element}</th>
    //     <th>{item.count}</th>
    //   </tr>
    // );

    return(

      array.map((user, index) =>
        <tr key = {index}>
          <th></th>
          <th>{removeDuplicates[0].element}</th>
          <th>{removeDuplicates[0].count}</th>
        </tr>
      ));
  };

  render() {
    const activeArray = this.props.activeElements;

    return(
      <table>
        <tbody>
          <tr>
            <th>No</th>
            <th>Word</th>
            <th>Count</th>
          </tr>
          {this.renderResultsTable(activeArray)}
        </tbody>
      </table>
    );
  }
}
export default DisplayResultsTable;