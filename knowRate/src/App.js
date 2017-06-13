import React, { Component } from 'react';
import './App.sass';

import Landing from "./components/landing/landing.component";

import Header from './components/header/header.component';

import MainHeader from './components/main/MainHeader.component';

import EventEmitter from './emitter';
import axios from 'axios';

import user from './components/user/user';

import {reactLocalStorage} from 'reactjs-localstorage';

class App extends Component {
  constructor(props) {
    super(props);
    let auth = false;
    if (reactLocalStorage.get("email") !== null) {
        auth = true;
        console.log(reactLocalStorage.get("email"));
        axios.get("http://localhost:8080/api/auth", {
            params: {
                username: reactLocalStorage.get("email"),
                password: reactLocalStorage.get("password")
            }
        }).then((response) => {
            user.setUser(response.data);
            reactLocalStorage.set("email", user.getUser().email);
            reactLocalStorage.set("password", user.getUser().password);
            EventEmitter.emit("login");
        });

    }
    this.state = {
        authorized: auth
    };
    EventEmitter.on('logout', this.unAuthorize);
    EventEmitter.on('login', this.authorize);
  }

  unAuthorize = () => {
    this.setState({authorized: false});
  };
  authorize = () => {
    console.log("hello");
    this.setState({authorized: true});
  };

  render() {
    return (
      <div className="App">
          {!this.state.authorized && <Header />}
          {!this.state.authorized && <Landing />}
          {this.state.authorized &&<MainHeader />}
      </div>
    );
  }
}

export default App;
