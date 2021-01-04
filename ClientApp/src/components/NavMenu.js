import React, { Component } from 'react';
import { Collapse, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { NAV_CSS } from '../config';

export class NavMenu extends Component {
    constructor (props) {
        super(props);

        this.state = {
            collapsed: true
        };
        
        // blue = production, green = dev
        this.classNameNav = `navbar navbar-expand-md navbar-dark fixed-top ${NAV_CSS()}`;
    }

    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <nav className={this.classNameNav}>
                <Link to="/">
                    <i className="fab fa-windows fa-2x twitter mr-1"></i>
                </Link>
                <NavLink className="navbar-brand d-none d-sm-block" tag={Link} to="/">Twitter App (Preview)</NavLink>
                <button className="navbar-toggler" onClick={() => this.toggleNavbar()} type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <ul className="nav navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink tag={Link} to="/account">Account</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink tag={Link} to="/tweet-queue">Tweet Queue</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink tag={Link} to="/tweet-portal">Compose Tweet</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink tag={Link} to="/info">Info</NavLink>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav navbar-right ml-auto">
                        <li className="nav-item">
                            <span className="navbar-text app-user">{this.props.user}</span>
                        </li>
                        <li className="nav-item">
                            <a href="" className="nav-link" onClick={() => this.props.logout()}>Log out</a>
                        </li>
                    </ul>
                </Collapse>
            </nav>
        );

        /*
        return (
          <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
              <Container>
                <NavbarBrand tag={Link} to="/">ReactNetCoreTemplate</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                  <ul className="navbar-nav flex-grow">
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                    </NavItem>
                  </ul>
                </Collapse>
              </Container>
            </Navbar>
          </header>
        );
        */
    }
}
