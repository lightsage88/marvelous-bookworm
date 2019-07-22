import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {

  }

  componentDidMount = () => {
    console.log('bitch');
    axios({
      url: "http://localhost:8000/marvel", 
      method: "GET",
      headers: {
        "accept" : 'application/json'
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    })
  }
  render () {

  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
