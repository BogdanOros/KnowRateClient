import React, { Component } from 'react'
import { Menu, Segment, Dropdown} from 'semantic-ui-react'
import { Router, Route, browserHistory } from 'react-router';
import Profile from './profile/profile.component';
import Main from './central/main.component';

import EventEmitter from './../../emitter';
import {reactLocalStorage} from 'reactjs-localstorage';
export default class MainHeader extends Component {
    state = { activeItem: 'main' };
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    getActiveTab = () => {
        switch (this.state.activeItem) {
            case 'main' : return <Main/>;
            case 'profile' : return <Profile/>;
        }
    };

    render() {
        const { activeItem } = this.state;
        let activeTab = this.getActiveTab();
        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item name='main' active={activeItem === 'main'} onClick={this.handleItemClick} />
                    <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick} />
                    <Menu.Menu position='right'>
                        <Dropdown item text='Options'>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>  { EventEmitter.emit('logout', null);
                                    reactLocalStorage.set("email", null);
                                    reactLocalStorage.set("password", null);
                                    }}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
                {activeTab}
            </div>
        )
    }
}