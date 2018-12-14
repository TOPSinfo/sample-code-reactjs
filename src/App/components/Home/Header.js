import React, { Component } from 'react';
import logo from '../../../assets/newlogo.png';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

class Header extends Component {
  
  render() {
    return (
        <header className="header" id="home-header" >
          <div className="container">
            <Navbar collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/"><img src={logo} alt="Logo" className="img-responsive" /></a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav className="main-navigation">
                  {/*<NavItem eventKey={1} href="#">
                    FAQ
                  </NavItem>
                  <NavItem eventKey={2} href="#">
                    Features
                  </NavItem>
                  <NavItem eventKey={3} href="#">
                    Enterprise
                  </NavItem>
                  <NavItem eventKey={4} href="#">
                    Blog
                  </NavItem>
                  <NavItem eventKey={5} href="#">
                    Contact Us
                  </NavItem>*/}
                </Nav>
                <Nav pullRight className="sign-up-container"> 
                  <NavItem eventKey={1} className="btn btn-signin" onClick={this.props.goTologin}>
                        Sign In
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </header>
    );
  }
}

export default Header;
