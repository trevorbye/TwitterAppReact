import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router';

import { NavMenu } from './components/NavMenu';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { TweetQueue } from './components/TweetQueue';
import { Account } from './components/Account';
import { Info } from './components/Info';
import { AccountRedirect } from './components/AccountRedirect';
import { Templates } from './components/Templates';

import { msalApp, initialCachedAuthCheck, logout } from './components/auth-utils/auth-config'
import './custom.css'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasCheckedCachedAuth: false,
            isAuthenticated: false,
            attemptedGuestLogin: false,
            msalConfig: msalApp,
            user: null, 
            viewportHeight: window.innerHeight
        }
    }

    async componentDidMount() {
        let cachedAuthToken = await initialCachedAuthCheck(this.state.msalConfig);
        this.setState({
            hasCheckedCachedAuth: true,
            isAuthenticated: (cachedAuthToken == null) ? false : true,
            user: (cachedAuthToken != null) ? this.state.msalConfig.getAccount().name : null
        })
    }

    updateAuthState(user) {
        if (user != null) {
            this.setState({
                isAuthenticated: true,
                user: user
            });
        } else {
            this.setState({
                attemptedGuestLogin: true
            });
        }
    }

    logoutHandler() {
        logout(this.state.msalConfig);
    }

    render() {
        if (!this.state.hasCheckedCachedAuth) {
            return null;
        }
        else if (!this.state.isAuthenticated) {
            return <Login msalConfig={this.state.msalConfig} updateAuthState={(userName) => this.updateAuthState(userName)} attemptedGuestLogin={this.state.attemptedGuestLogin} />
        }
        else {
            return (
                <div>
                    <NavMenu user={this.state.user} logout={() => this.logoutHandler()}/>
                    <Container className="main-container">
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/tweet-queue' render={() => <TweetQueue
                                msalConfig={this.state.msalConfig}
                                viewportHeight={this.state.viewportHeight}
                                compose={false}
                                key={"queue"}
                                />}
                            />
                            <Route path='/tweet-portal' render={() => <TweetQueue
                                msalConfig={this.state.msalConfig}
                                viewportHeight={this.state.viewportHeight}
                                compose={true}
                                key={"compose"}
                                />}
                            />
                            <Route path="/account" render={() => <Account msalConfig={this.state.msalConfig} />} />
                            <Route path="/templates" render={(props) => {
                                console.log(props);
                                return <Templates msalConfig={this.state.msalConfig} {...props} />
                                
                            }} />
                            <Route path="/info" component={Info} />
                            <Route path="/add-account-redirect" render={(props) => <AccountRedirect msalConfig={this.state.msalConfig} location={props.location} />} />
                        </Switch>
                    </Container>
                </div>
            );
        }
    }
}
