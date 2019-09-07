import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import marvelLogo from '../assets/pictures/marvelLogo.jpg';
import {  Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import {attemptLogout} from '../actions';

const Brand = styled.span`

    font-family: "Marvel", sans-serif;
    border:solid white;
    background: red;


`;


export class Head extends React.Component {
    state = {
        isOpen: false,
        loggedIn: false
    }

    componentDidUpdate(prevProps) {
      console.log(this.props);
      if(this.props.loggedIn !== prevProps.loggedIn) {
        this.setState(prevState=>({
          loggedIn: this.props.loggedIn
        }))
      }
    }

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    attemptLogOut = (e) => {
      e.preventDefault();
      this.props.dispatch(attemptLogout());
    }

    render() {
      
    return (
        <div>
        <Navbar color="dark" dark expand="md">
          <NavLink to="/">
          <NavbarBrand>
            <Brand>Marvelous Bookworm</Brand>
          </NavbarBrand>
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                {this.state.loggedIn == false ? (
                  
                    <React.Fragment>
                    <NavItem>
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </NavItem>
                    </React.Fragment>
                    
                
                ) : (
                  
                   <React.Fragment>
                   <NavItem>
                      <NavLink className="nav-link" to="/search">Search</NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className="nav-link" to="/collection">Collection</NavLink>
                    </NavItem>
                    
                    <NavItem>
                      <NavLink className="nav-link" to="/account">Account</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                      <a className="nav-link" href='' id="logoutAnchor" onClick={(e)=>this.attemptLogOut(e)}>Log Out</a>
                    </NavItem>
                    </React.Fragment>
                  
              
              
              )}
              
            </Nav>
          </Collapse>
        </Navbar>
        </div>
    )
    }
}

const mapStateToProps = state => ({
  username: state.user.username,
  loggedIn: state.user.loggedIn || false
});

export default connect(mapStateToProps)(Head);

