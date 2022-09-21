import React from 'react';
import {
    Row,
    Col,
    Image
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import astronaut from '../../assets/images/Astronaut1.png';
import logo from '../../assets/images/NEAR.png';

const HeroBanner = () => {
    return (
        <div className="hero-banner-container">
           <Row className='hero-banner'>
                <Col lg={7} sm={1} className='content-col'>
                    <h1 className='content-header'>Simplified Onchain <span className='gradient-text'>Indexes</span></h1>
                    <p className='content-description'>Invex is an infrastructure platform for aggregating, transacting, creating and managing on chain Indexes on Near</p>
                    <div className='button-wrapper'>
                        <Link to={`/waitlist`} className='gradient-btn btn'>
                            Join the Waitlist
                        </Link>
                        <Link to={`/betaaccess`} className='gradient-btn btn'>
                            I have Beta Access?
                        </Link>
                    </div>
                    
                </Col>
                <Col lg={5} sm={1} className='image-col'>
                    <Image className='hero-image-desktop' src={astronaut} />
                    <p className='hero-image-text'>Build on <Image className='near-logo' src={logo}/></p>
                </Col>
           </Row>
        </div>
    );
};

export default HeroBanner;
