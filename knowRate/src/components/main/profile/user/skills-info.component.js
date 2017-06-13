/**
 * Created by TaliZorah on 10.05.2017.
 */
import React from 'react';

import { Card, Icon, Image, Item } from 'semantic-ui-react'
import { Rating, Button } from 'semantic-ui-react'
import ReactModal from 'react-modal';

import axios from 'axios';


import {
    ShareButtons,
    generateShareIcon
} from 'react-share';

import "../profile.style.sass";

export default class SkillsInfo extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            skills: props.user.skills,
            id: props.user.id
        }
        this.predefinedSkills = [
            {
                name: "Math",
                rating: null
            },
            {
                name: "C/C++",
                rating: null
            },
            {
                name: "Programs",
                rating: null
            },
            {
                name: "Java",
                rating: null
            },
            {
                name: "JavaScript",
                rating: null
            },
        ]
    }

    showSkills = () => {
      return this.state.skills.map((skill) => {
        return (
            <Item>
                <Item.Image size='tiny' src='https://cdn0.iconfinder.com/data/icons/seo-development-services-glyph/614/3273_-_Brainstorming-512.png' />

                <Item.Content verticalAlign='middle'>
                    <Item.Header>
                        {skill.name}
                    </Item.Header>
                    <Item.Meta>
                        <Rating maxRating={5} rating={skill.rating} clearable />
                    </Item.Meta>
                    <Button circular icon='minus' onClick={() => {this.removeSkill(skill)}} />
                </Item.Content>
            </Item>
        )
      });
    };

    removeSkill = (skill) => {
        axios.put("http://localhost:8080/api/accounts/" + this.state.id + "/skill", {
            name: skill.name,
            rating: skill.rating
        }).then((response) => {
            this.state.skills.splice(this.state.skills.indexOf(skill), 1);
        })
    };

    chooseSkills = () => {
      return this.predefinedSkills.map(skill => {
          return (
              <Item>
                  <Item.Image size='tiny' src='https://cdn0.iconfinder.com/data/icons/seo-development-services-glyph/614/3273_-_Brainstorming-512.png' />

                  <Item.Content verticalAlign='middle'>
                      <Item.Header>
                          {skill.name}
                      </Item.Header>
                      <Item.Meta>
                          <Rating maxRating={5}  clearable />
                      </Item.Meta>
                  </Item.Content>
                  <Button  disabled={this.state.skills.filter(curr => {
                      return curr.name == skill.name;
                  }).length > 0} circular icon='plus' onClick={() => {this.addSkill(skill)}} />
              </Item>
          );
      })
    };

    addSkill = (skill) => {
        axios.post("http://localhost:8080/api/accounts/" + this.state.id + "/skill", {
            name: skill.name,
            rating: skill.rating
        }).then((response) => {
            this.state.skills.push(skill);
        })
    };

    render() {
        this.customStyle = {
            overlay : {
                position          : 'fixed',
                top               : 0,
                left              : 0,
                right             : 0,
                bottom            : 0,
                backgroundColor   : 'rgba(240,240,240, 0.75)'
            },
            content : {
                width: "600px",
                height: "400px",
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
        const GooglePlusIcon = generateShareIcon('google');
        const {
            GooglePlusShareButton
        } = ShareButtons;
        return (
            <div className="skills-wrp">
                <div className="skills-title">
                    <span>Skills</span>
                    <GooglePlusShareButton url="localhost:3000" >
                        <GooglePlusIcon size={30} round={true}/>
                    </GooglePlusShareButton>
                </div>
                <hr />
                <Item.Group>
                    {this.showSkills()}
                </Item.Group>
                <Button circular icon='plus' onClick={() => this.setState({isOpen: true})} />
                <ReactModal
                    contentLabel="Join Us"
                    style={this.customStyle}
                    onRequestClose={() => this.setState({isOpen: false})}
                    isOpen={this.state.isOpen}>
                    <div>{
                        this.chooseSkills()
                    }</div>
                </ReactModal>
            </div>
        );
    }

}