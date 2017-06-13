/**
 * Created by TaliZorah on 10.05.2017.
 */
import React from 'react';

import { Card, Icon, Image, Item } from 'semantic-ui-react'
import { Rating, Button } from 'semantic-ui-react'


export default class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           user: props.user
        }
    }

    render() {
        return (
            <div className="info-wrp">
                <Card>
                    <Image className="user-img" src='https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png' />
                    <Card.Content>
                        <Card.Header>
                            {this.state.user.firstName + ' ' + this.state.user.lastName}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                              {this.state.user.birthDate}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {this.state.user.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            {this.state.user.accounts.length}
                        </a>
                    </Card.Content>
                </Card>
            </div>
        );
    }

}