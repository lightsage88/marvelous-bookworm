import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, CardImg } from "shards-react";
import {refreshStateWithToken, getDetailedEventInfo} from '../actions';




export class Search extends Component {
  state = {
    value: '',
    suggestions: [],
    message: ''
  }

  typingTimer = null;

 

  onChange = (e) => {
    let value = e.target.value;
    this.setState({
      value,
      suggestions: []
    });
    this.handleTypingChange(e);
  
  }

  onClick = (index) => {
    //need to use a freezing updatable loader so that we can avoid errors, but make it flexible enough to deal with error handling.

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
      console.log(this.state.suggestions[index]);
      // this.handleCharacterAddResponse(response, index);
   
      console.log('getting event stuff')
      this.props.dispatch(getDetailedEventInfo(this.props.username ,this.state.suggestions[index].id))
      return response
    })
    .then(response => {
      this.handleCharacterAddResponse(response, index);

    })
    // .then(()=> {
    //   //Need to save the new event per each character
    //   this.props.dispatch(refreshStateWithToken(localStorage.getItem('authToken')));
    // })
    .catch(err => {
      console.error(err);
      console.log(err.error);
      console.log(err);
      
      
    });
  }

  waitForTapToCloseMessage = () => {
    console.log('tapp tapp');
  }

  handleCharacterAddResponse = (response, index) => {
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

      homeComponentMessage.classList.remove('homeComponentMessageFailure');

      }, 2000)


    } else {
      this.setState(prevState=> ({
        message: "Character Added!"
      }));
      console.log(this.state.suggestions[index]);
      console.log(this.state.suggestions[index].id);


     
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
//todo: Make int a thunk type thing
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
      let data = response.data;
      this.putSelectionsInStateSuggestions(data);
    })
    .catch(err => {
      console.error(err);
    })
   
  }

  
  putSelectionsInStateSuggestions = (array) => {
    array.forEach(object => {
      this.setState(prevState =>({
        suggestions: [...prevState.suggestions, object]
      }))
    })
  }

  render () {

    
  console.log(this.props);

   
  
   
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
        <input id="homeComponentInput" type='text' onChange={(e)=>{this.onChange(e)}} />
        
        {suggestionCards}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username || '',
  characters: state.user.characters || []

})

export default connect(mapStateToProps)(Search);