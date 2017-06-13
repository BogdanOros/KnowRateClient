import React from 'react';
import { Divider, Form, Label, Input, Button, Rating } from 'semantic-ui-react'
import { Image, Item } from 'semantic-ui-react'
import ReactPaginate from 'react-paginate';
import ReactModal from 'react-modal';
import Spinner from 'react-spinner-material';
import axios from 'axios';

import GoogleMapReact from 'google-map-react';

import './main.style.sass';

export default class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.allCompanies = null;
        this.state = {
            modalIsOpen: false,
            companies: this.allCompanies,
            size: 2,
            offset: 2,
            currentPage: 0,
            center: {lat: 59.95, lng: 30.33},
            zoom: 11,
            activeCompany: null,
            compareIsOpen: false
        };
        this.showCompanies = this.showCompanies.bind(this);
        axios.get('http://localhost:8080/api/companies')
            .then((response) => { this.allCompanies = response.data; this.setState({companies: this.allCompanies})});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    showCompanies() {
        let customStyle = {
            overlay : {
                position          : 'fixed',
                top               : 0,
                left              : 0,
                right             : 0,
                bottom            : 0,
                backgroundColor   : 'rgba(240,240,240, 0.75)'
            },
            content : {
                width: "400px",
                height: "300px",
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
        let activeCompanies = this.state.companies.slice(this.state.currentPage * this.state.size, this.state.currentPage * this.state.size + 2);
        console.log(activeCompanies);
        console.log("show reload");
        return activeCompanies.map(function (company) {
           return (
               <div className="company-holder">
                   <Item className="company-item">
                       <Item.Image className="item-image" size='small' src={company.imageUrl} />

                       <Item.Content className="item-content">
                           <Item.Header className="item-header" as='p'>{company.name}</Item.Header>
                           <Item.Description>
                               <span className="item-description">{company.description}</span>
                               <a className="item-address">
                                   <span onClick={() => this.setState({modalIsOpen: true})} >{company.address.address}</span>
                                   <ReactModal
                                       contentLabel="Log In"
                                       style={customStyle}
                                       onRequestClose={this.closeModal}
                                       isOpen={this.state.modalIsOpen}>
                                       <div className="map-holder">
                                           <GoogleMapReact
                                               bootstrapURLKeys={{key: "AIzaSyBnbf7Lt8bolrSroW6dHA87yCx65lzJnxE"}}
                                               defaultCenter={{lat: company.address.ltt, lng: company.address.lng}}
                                               defaultZoom={this.state.zoom}
                                           >
                                               <AnyReactComponent
                                                   lat={company.address.ltt}
                                                   lng={company.address.lng}
                                                   text={company.address.address}
                                               />
                                           </GoogleMapReact>
                                       </div>
                                   </ReactModal>
                               </a>
                           </Item.Description>
                           <a onClick={() => {this.setState({compareIsOpen: true, activeCompany: company}); }}>
                               Compare
                           </a>
                       </Item.Content>
                   </Item>
               </div>
           )
        }, this);
    };

    showSkills = () => {
        console.log(this.state.activeCompany);
        if (this.state.activeCompany == null) return;
        return this.state.activeCompany.skills.map((skill) => {
            return (
                <Item>
                    <Item.Image size='tiny' src='https://cdn0.iconfinder.com/data/icons/seo-development-services-glyph/614/3273_-_Brainstorming-512.png' />

                    <Item.Content verticalAlign='middle'>
                        <Item.Header>
                            {skill.name}
                        </Item.Header>
                    </Item.Content>
                </Item>
            )
        });
    };

    search = (event) => {
        let result = this.allCompanies.filter(function (company) {
            return company.name.includes(event.target.value);
        });
        this.setState({companies: result});
    };

    handlePageClick = (event) => {
        this.setState({currentPage: event.selected});
    };

    render() {
        let customStyle = {
            overlay : {
                position          : 'fixed',
                top               : 0,
                left              : 0,
                right             : 0,
                bottom            : 0,
                backgroundColor   : 'rgba(240,240,240, 0.75)'
            },
            content : {
                width: "400px",
                height: "300px",
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
        return (
            <div>
                <Form>
                    <Form.Field>
                        <Label pointing="below">Please enter a company name</Label>
                        <Input onChange={this.search} icon='search' placeholder='Search...' />
                    </Form.Field>
                    <Divider />
                    <Item.Group>
                        {this.state.companies == null && <SpinnerComponent/>}
                        {this.state.companies != null && this.showCompanies()}
                        <ReactModal
                            contentLabel="Log In"
                            style={customStyle}
                            onRequestClose={() => this.setState({compareIsOpen: false})}
                            isOpen={this.state.compareIsOpen}>
                            <div>
                                You need this skills!
                                {this.showSkills()}
                            </div>
                        </ReactModal>
                    </Item.Group>
                    <ReactPaginate previousLabel={"previous"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="">...</a>}
                                   breakClassName={"break-me"}
                                   pageCount={this.state.companies == null ? 0 : this.state.companies.length / 2}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination"}
                                   subContainerClassName={"pages pagination"}
                                   activeClassName={"active"} />
                </Form>
            </div>
        );
    }
}
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SpinnerComponent = () => {
    return (
        <div>
            <Spinner width={100}
                     height={120}
                     spinnerColor={"#333"}
                     spinnerWidth={2}
                     show={true}/>
         </div>
    );
};