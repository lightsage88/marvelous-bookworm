import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {maintainState} from './actions';
import styled from 'styled-components';
import './App.css';
import Landing from './components/Landing';
import Account from './components/Account';
import Collection from './components/Collection';
import About from './components/About';
import Search from './components/Search';
import Signup from './components/Signup';
import Login from './components/Login';
import Head from './components/Head';
import Foot from './components/Foot';
import axios from 'axios';



const AppFooter = styled.footer`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: -webkit-fill-available;

`;



export const App = (props) => {
  
  
  
  return (
    <Router>
      <div className="App">
      <Head />
      <Route exact path="/" component={Landing} /> 
      <Route path="/about" component={About} />
      <Route path="/collection" component={Collection} />
      <Route path="/search" component={Search} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/account" component={Account} />


      <AppFooter className="footer mt-auto py-3">
        This is a footer
      </AppFooter>
      </div>
    </Router>
  );
  
}

const mapStateToProps = (state) => ({
  ...state
})

export default connect(mapStateToProps)(App);
