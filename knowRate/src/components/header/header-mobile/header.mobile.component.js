import React from 'react';
import HamburgerMenu from 'react-hamburger-menu'

import './header.mobile.style.sass';

class HeaderMobile extends React.Component {

    render() {
        return (
            <div className="mobile">
                <DropDownMenu isOpen={this.props.isOpen} 
                                setOpenedState={this.props.setOpenedState}/>
            </div>
        );
    }
}

const DropDownMenu = (props) => {
    return (
         <HamburgerMenu
            isOpen={props.isOpen}
            menuClicked={()=> props.setOpenedState({open: !props.isOpen}) }
            width={18}
            height={15}
            position={"fixed"}
            strokeWidth={2}
            rotate={0}
            color='#a09f9f'
            borderRadius={0}
            animationDuration={0.5}
        />
    );
}

export default HeaderMobile;