import React, { Component } from 'react';
import { login } from './auth-utils/auth-config'

export class Login extends Component {
    componentDidMount() {
        window.history.replaceState(null, "Login", "/")
    }
    
    async loginClickHandler() {
        let user = await login(this.props.msalConfig);
        console.log(user);
        if (user != null) {
            this.props.updateAuthState(user.name);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center login-container">
                    <div className="col-md-6 text-center">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => this.loginClickHandler()}>
                            <i className="fab fa-microsoft fa-2x align-middle"></i>
                            <span className="align-middle ml-2">Microsoft employee sign in</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
