import React from 'react';
// Semantic UI Imports
import { Input } from 'semantic-ui-react';

import './header.full.style.sass';

import LoginDialog from './../../login/login.component';

class HeaderDesktop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            isLoginState: false
        };
    }

    render() {
        return (
            <div className="fullscreen-header-content">
                <ul>
                    <li className="header-join" onClick={() => this.setState({modalIsOpen: true, isLoginState: true})}>
                        <a>Log In</a>
                     </li>
                    <li className="header-join" onClick={() => this.setState({modalIsOpen: true, isLoginState: false})}>
                        <a>Join</a>
                    </li>
                </ul>
                <LoginDialog modalIsOpen={this.state.modalIsOpen} isLoginState={this.state.isLoginState}/>
             </div>
        );
    }
}

export default HeaderDesktop;