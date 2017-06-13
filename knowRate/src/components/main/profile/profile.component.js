import React from 'react'
import { Card, Icon, Image, Item } from 'semantic-ui-react'
import { Rating, Button } from 'semantic-ui-react'

import user from './../../user/user';

import ProfileInfo from './user/profile-info.component';
import SkillsInfo from './user/skills-info.component';
import FriendsInfo from './user/friends-info.component';

import './profile.style.sass';

export default class Profile extends React.Component {

    render() {
        return (
            <div className="profile-wrp">
                <ProfileInfo user={user.getUser()} />
                <SkillsInfo user={user.getUser()} />
                <FriendsInfo user={user.getUser()} />
            </div>
        );
    }

}

