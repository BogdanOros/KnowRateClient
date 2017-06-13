import React from 'react';

import { Card, Icon, Image, Item } from 'semantic-ui-react'
import { Rating, Button } from 'semantic-ui-react'

import ReactScrollbar from 'react-scrollbar-js';

import "../profile.style.sass";

export default class FriendsInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            friends: props.user.accounts
        }

    }

    showFriends = () => {
      return this.state.friends.map(function (friend) {
          return (
              <Card>
                  <Card.Content>
                      <Image floated='right' size='mini' src='https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png' />
                      <Card.Header>
                          {friend.lastName + " " + friend.firstName}
                      </Card.Header>
                      <Card.Meta>
                          {friend.birthDate}
                      </Card.Meta>
                      <Card.Description>
                          {friend.description}
                      </Card.Description>
                  </Card.Content>
              </Card>
          )
      })
    };

    render() {
        const myScrollbar = {
            height: 500,
        };
        return (
            <div className="friends-wrp">
                Friends
                <hr />
                <ReactScrollbar style={myScrollbar}>
                    <Card.Group itemsPerRow="1" className="friends-scroll-wrp">
                        {this.showFriends()}
                    </Card.Group>
                </ReactScrollbar>
            </div>
        );
    }

}