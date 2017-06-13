import React from 'react';
import Slider from 'react-slick';

import "./landing.style.sass";

export default class Landing extends React.Component {

    settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    render() {
        return (
        <div className="landing-wrp">
            <div className="arrow-wrp">
                <h2>Be the best in</h2>
            </div>
            <div className="image-wrp">
                <img src="https://www.wpclipart.com/signs_symbol/arrows/arrow_comic/Arrow_comic_right_gray.png" />
            </div>
            <div className="slider-holder">
                <Slider className="slider" {...this.settings}>
                    <div className="element-wrp"><h3>Mathematics</h3></div>
                    <div className="element-wrp"><h3>Physics</h3></div>
                    <div className="element-wrp"><h3>Programming</h3></div>
                </Slider>
            </div>
        </div>
        );
    }

}