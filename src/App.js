import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import './App.css';
import Landing from './components/Landing';
import Account from './components/Account';
import About from './components/About';
import Collection from './components/Collection';
import Signup from './components/Signup';
import Login from './components/Login';
import Search from './components/Search';
import Head from './components/Head';
import Foot from './components/Foot';
import axios from 'axios';

const MarvelFont = createGlobalStyle`
 body {
    font-family: "Marvel", sans-serif;
    @import: url('./assets/fonts/Bebas-Regular.ttf') format('ttf');
 }
  
`


const App = () => {
  

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
  return (
    <Router>
      <div className="App">
      <Head />
      <Route exact path="/" component={Landing} /> 
      <Route path="/about" component={About} />
      <Route path="/collection" component={Collection} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/account" component={Account} />
      <Route path="/search" component={Search} />


      <Foot />
      </div>
    </Router>
  );
  
}

export default App;
