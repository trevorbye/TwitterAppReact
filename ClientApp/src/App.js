import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router';

import { NavMenu } from './components/NavMenu';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { TweetQueue } from './components/TweetQueue';
import Footer from './components/Footer';

import { msalApp, getTokenSilent } from './components/auth-utils/auth-config'
import './custom.css'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasCheckedCachedAuth: false,
            isAuthenticated: false,
            msalConfig: msalApp,
            user: null, 
            viewportHeight: window.innerHeight
        }
    }

    async componentDidMount() {
        let cachedAuthToken = await getTokenSilent(this.state.msalConfig);
        this.setState({
            hasCheckedCachedAuth: true,
            isAuthenticated: (cachedAuthToken == null) ? false : true,
            user: this.state.msalConfig.getAccount().name
        })
    }

    updateAuthState(user) {
        this.setState({
            isAuthenticated: true,
            user: user
        });
    }

    render() {
        if (!this.state.hasCheckedCachedAuth) {
            return null;
        }
        else if (!this.state.isAuthenticated) {
            return <Login msalConfig={this.state.msalConfig} updateAuthState={(userName) => this.updateAuthState(userName)} />
        }
        else {
            return (
                <div>
                    <NavMenu user={this.state.user} />
                    <Container className="main-container">
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/tweet-queue' render={() => <TweetQueue
                                msalConfig={this.state.msalConfig}
                                viewportHeight={this.state.viewportHeight}
                                />}
                            />
                        </Switch>
                    </Container>
                    <Footer />
                </div>
            );
        }
    }
}
