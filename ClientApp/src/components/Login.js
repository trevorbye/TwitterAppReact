import React, { Component } from 'react';
import { login, getAuthHeadersSilent } from './auth-utils/auth-config'
import axios from 'axios';

export class Login extends Component {
    componentDidMount() {
        window.history.replaceState(null, "Login", "/")
    }
    
    async loginClickHandler() {
        let user = await login(this.props.msalConfig);

        const baseUrl = "https://mstwitterbot.azurewebsites.net/";
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        try {
            await axios.get(baseUrl + "api/get-distinct-handles", authHeaders);
        } catch (error) {
            if (error.response.status === 401) {
                this.props.updateAuthState(null);
            }
        }
        
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

                        {
                            this.props.attemptedGuestLogin &&
                            <div className="alert alert-danger mt-2" role="alert">
                                <h6 className="alert-heading"><i className="fas fa-info-circle"></i> Note</h6>
                                <br />
                                <p className="mb-0">
                                    ​​​​​​ Guest accounts are not allowed in this application. Please login with your @microsoft.com account.
                                </p>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}
