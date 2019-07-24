import React from 'react';
import styled from 'styled-components';
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

const Brand = styled.span`

    font-family: "Marvel", sans-serif;
    border:solid white;
    background: red;


`;


class Head extends React.Component {
    state = {
        isOpen: false,
        isLoggedIn: true
    }

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
    return (
        <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">
            <Brand>Marvelous Bookworm</Brand>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                {!this.state.isLoggedIn ? (
                  
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
                      <NavLink className="nav-link" to="/home">Home</NavLink>
                    </NavItem>
                    
                    <NavItem>
                      <NavLink className="nav-link" to="/account">Account</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                      <a className="nav-link" href=''>Log Out</a>
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

export default Head;