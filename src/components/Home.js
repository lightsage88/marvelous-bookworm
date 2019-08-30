import React, {Component} from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, CardImg } from "shards-react";

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
    suggestions: [],
    message: ''
  }

  typingTimer = null;

 

  onChange = (e) => {

    console.log(e.target);
    console.log('hi');
    let value = e.target.value;
    console.log(value);
    this.setState({
      value,
      suggestions: []
    });
    this.handleTypingChange(e);
  
  }

  onClick = (index) => {
    console.log('you clicked a marvel card!');
    //We will click this, and then the User will have the information from the react-state for that character
    //pushed into the approrpiate model in our MongoDB.

    console.log(index);

    console.log(this.state.suggestions[index]);

    axios({
      url: 'http://localhost:8000/api/users/addCharacter',
      method: 'POST',
      headers: {
        "accept": 'application/json'
      },
      data: {
        characterObject: this.state.suggestions[index]
      }
    })
    .then(response => { 
      this.handleCharacterAddResponse(response);
    })
    .catch(err => {
      console.error(err);
      console.log(err.error);
      console.log(err);
      
      
    });
  }

  waitForTapToCloseMessage = () => {
    console.log('tapp tapp');
  }

  handleCharacterAddResponse = (response) => {
    let homeComponentDiv = document.getElementById('homeComponentDiv');
    let homeComponentMessage = document.getElementById('homeComponentMessage');
    console.log('hcar running');
    if(response.data.code == 422) {
      this.setState(prevState=> ({
        message: response.data.message
      }));

      homeComponentMessage.classList.add('homeComponentMessageFailure');

      setTimeout(()=>{
      console.log('hottudoggo');
      this.setState(prevState=> ({
        message: ''
      }));
      // homeComponentDiv.classList.remove('homeComponentDivBlur');

      homeComponentMessage.classList.remove('homeComponentMessageFailure');

      }, 2000)


    } else {
      this.setState(prevState=> ({
        message: "Character Added!"
      }));
     
      // homeComponentDiv.classList.add('homeComponentDivBlur');
      homeComponentMessage.classList.add('homeComponentMessageSuccess');

      setTimeout(()=>{
      console.log('hanbaga');
      this.setState(prevState=> ({
        message: ''
      }));
      // homeComponentDiv.classList.remove('homeComponentDivBlur');

      homeComponentMessage.classList.remove('homeComponentMessageSuccess');

      }, 2000)
    }
  }

  handleTypingChange = (e) => {
    console.log('handling typing change like ab oxx');
    console.log(e.target.value);
    let value = e.target.value;
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(()=>{this.doCharacterSearch(value)}, 450);
  }

  doCharacterSearch = (value) => {
    console.log('we are doing the character serach');
    this.setState({
      value
    });
    axios({
      url: 'http://localhost:8000/api/characters/search',
      method: "POST",
      headers: {
        "accept" : 'application/json'
      },
      data: {
        query: value
      }
    })
    .then(response => {
      console.log(response);
      this.putSelectionsInStateSuggestions(response.data);
    })
    .catch(err => {
      console.error(err);
    })
   
  }

  onSuggestionsFetchRequested = (x) => {
    console.log('hi there');
  }
 
  onSuggestionsClearRequested = (y) => {
    console.log('sleepy');
  }

  putSelectionsInStateSuggestions(array) {
    array.forEach(object => {
      this.setState(prevState =>({
        suggestions: [...prevState.suggestions, object]
      }))
    })
  }

  render () {

    
  

   
  
   
    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Type a Marvel Character',
      value,
      onChange: this.onChange
    }

    const suggestionDeck = this.state.suggestions;

    const suggestionCards = suggestionDeck.map((item, index)=>
   
        <Card onClick={()=>{this.onClick(index)}} data-key={index} className="suggestionCards" key={index} style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
          url(${item.thumbnail.path}.${item.thumbnail.extension}) no-repeat center`
          }}>
          <h2 className="suggestionCardsH2">{item.name}</h2>
        </Card>
      

    );


  
    

    return (
      <div id="homeComponentDiv">
        <h2>Home Component</h2>
        <h1 id="homeComponentMessage">{this.state.message}</h1>
        <input type='text' onChange={(e)=>{this.onChange(e)}} />
        
        {suggestionCards}
      </div>
    )
  }
}

export default Home;