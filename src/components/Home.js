import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);



class Home extends Component {
  state = {
    value: '',
    suggestions: []
  }

  typingTimer = null;

  // componentDidMount = () => {
  //   axios({
  //     url: "http://localhost:8000/marvel", 
  //     method: "GET",
  //     headers: {
  //       "accept" : 'application/json'
  //     }
  //   })
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   })
  // }
  // onChange = (e) => {
  //   let value = e.target.value;
  //   this.handleTypingChange(value);
  // } 

  onChange = (e) => {
    console.log(e.target);
    console.log('hi');
    let value = e.target.value;
    console.log(value);
    this.setState({
      value
    });
  }

  handleTypingChange = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(()=>{this.doCharacterSearch(value)}, 250);
  }

  doCharacterSearch = (value) => {
    this.setState({
      value
    });
    
  }

  onSuggestionsFetchRequested = (x) => {
    console.log('hi there');
  }
 
  onSuggestionsClearRequested = (y) => {
    console.log('sleepy');
  }

  render () {

    
  

   
  
   
    const {value, suggestions} = this.state;

    // const onChange = (e) => {
    //   console.log(this.state);
    //   console.log(e.target.value);
    //   // this.setState(prevState=>({
    //   //   value: e.target.value
    //   // }))
    //   this.setState({
    //     value: e.target.value
    //   })
    // } 
    const inputProps = {
      placeholder: 'Type a Marvel Character',
      value,
      onChange: this.onChange
    }

  
    

    return (
      <div>
        <h2>Home Component</h2>
        <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

export default Home;