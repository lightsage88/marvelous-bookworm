import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Loader from './Loader';
import { Container, Row, Col, Card, CardBody, CardImg } from "shards-react";
import {refreshStateWithToken, getDetailedEventInfo, refreshCharacters} from '../actions';
import {API_BASE_URL} from '../config';

const loadingMessageBank = [
  'Bonding with symbiotes',
  'Firing up Cerebro',
  'Calibrating Jarvis',
  'Refilling webshooters',
  'Getting bitten by radioactive spiders',
  'Administering Super-Solider Serum',
  'Summoning Mjolnir'
];





export class Search extends Component {
  state = {
    value: '',
    suggestions: [],
    message: '',
    loading: false,
    loadingMessage: ''
  }

  typingTimer = null;

  t = setInterval(this.displayLoadingMessage, 1400);

 
 

  onChange = (e) => {
    let value = e.target.value;
    this.setState({
      value,
      suggestions: []
    });
    this.handleTypingChange(e);
  }



  

  onClick = (index) => {
    let stop;
    console.log(this.props);
    console.log(this.state);

    this.props.characters.forEach(element => {
      if(element.id == this.state.suggestions[index].id) {
        stop = true;
      } else {
        console.log('meh');
      }
    })


    if(this.props.characters.length > 0 && stop === true){
      // if(this.props.characters[index].id == this.state.suggestions[index].id) {
        this.handleCharacterAddResponse(null, null, 'alreadyHave');
      
         return;
       
    } else {
    //need to use a freezing updatable loader so that we can avoid errors, but make it flexible enough to deal with error handling.
    this.displayLoadingMessage();
    axios({
      url: `${API_BASE_URL}/api/users/addCharacter`,
      method: 'POST',
      headers: {
        "accept": 'application/json'
      },
      data: {
        characterObject: this.state.suggestions[index],
        username: this.props.username
      }
    })
    .then(response => { 
      console.log(this.state.suggestions[index]);
      // this.handleCharacterAddResponse(response, index);
   
      console.log('getting event stuff')
      this.eventRetrieval(index);
      // this.props.dispatch(getDetailedEventInfo(this.props.username ,this.state.suggestions[index].id))
      // return response
    })
    // .then(response => {

    //   this.handleCharacterAddResponse(response, index);

    // })
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
  }

  displayLoadingMessage = () => {
    this.setState({
      loadingMessage: loadingMessageBank[Math.floor(Math.random()*loadingMessageBank.length)],
      loading: true
    });
    
  }

  eventRetrieval = (index) => {  
    axios({
      url: `${API_BASE_URL}/api/characters/events`,
      method: "POST",
      headers: {
          accept: "application/json"
      },
      data: {
          charID: this.state.suggestions[index].id,
          username: this.props.username
      }
  })
  .then(response => {
      console.log('gophers are out');
      console.log(response.data);
      this.props.dispatch(refreshCharacters(response.data));
      console.log(response)
      return response
      
  })
  .then(_response => {
    console.log(_response);
    console.log('should kill the t');
    clearInterval(this.t);
    this.handleCharacterAddResponse(_response, index)
  })
  .catch(err => {
      console.error(err);
  });
    
  }

  waitForTapToCloseMessage = () => {
    console.log('tapp tapp');
  }

  handleCharacterAddResponse = (response, index, fail) => {
    this.setState({
      loading: false,
      loadingMessage: ''
    })
    let homeComponentDiv = document.getElementById('homeComponentDiv');
    let homeComponentMessage = document.getElementById('homeComponentMessage');
    console.log('hcar running');
    console.log(response);
    if(fail == "alreadyHave") {
      this.setState(prevState=> ({
        message: "You already have this character!",
        loading:false
      }));

      homeComponentMessage.classList.add('homeComponentMessageFailure');

      setTimeout(()=>{
      console.log('hottudoggo');
      this.setState(prevState=> ({
        message: '',
        loading: false
      }));

      homeComponentMessage.classList.remove('homeComponentMessageFailure');

      }, 2000)


    } else {
      this.setState(prevState=> ({
        message: "Character Added!",
        loading: false
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
    this.displayLoadingMessage();
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
      /////
      clearInterval(this.t);
      this.setState({
        loading: false,
        loadingMessage: ''
      });
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
  // if(this.state.suggestions.length > 0) {
  //   clearInterval(this.t);
  //   this.setState({
  //     loading: false
  //   })
  // }

   
  
   
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
      <Loader loading={this.state.loading} loadingMessage={this.state.loadingMessage}/>
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