import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {AnimatedSwitch} from 'react-router-transition';
import {connect} from 'react-redux';
import {maintainState} from './actions';
import styled from 'styled-components';
import './App.scss';
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



   const renderRedirect = () => {
        console.log('rerer');
        if(!localStorage.getItem('authToken')) {
            console.log('bota fuori');
            return <Redirect to="/" />
        }   
    }
    



export class App extends React.Component {
  
  render() {
    
    return (
      <Router>
        <div className="App" >
        <Head />
      <AnimatedSwitch
      atEnter={{ opacity: 0.5 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"  
      
      >
        <Route exact path="/" render={(props) => <Landing   {...this.props} renderRedirect={renderRedirect} />}  />

        {/* <Route exact path="/" render={(props) => <Landing   {...this.props} renderRedirect={renderRedirect()} />}  /> */}

        {/* <Route path="/about" render={(props) => <About   {...this.props} renderRedirect={renderRedirect()} />} /> */}

        <Route path="/about" render={(props) => <About   {...this.props} renderRedirect={renderRedirect} />} />


        <Route path="/collection" render={(props) => <Collection  {...this.props} renderRedirect={renderRedirect} />} />
        <Route path="/search" render={(props) => <Search   {...this.props} renderRedirect={renderRedirect} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/account" render={(props) => <Account   {...this.props} renderRedirect={renderRedirect} />}/>
      </AnimatedSwitch>

        
        </div>
        
      </Router>
    );
  }
  
}

const mapStateToProps = (state) => ({
  ...state
})

export default connect(mapStateToProps)(App);
