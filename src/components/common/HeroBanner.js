import React from 'react';
import { Row, Col, Image,  Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import bannerImage from '../../assets/images/HeroBannerImage.png';
import InvexLogo from '../../assets/images/indexLogos/Invex.png';

const HeroBanner = () => {
    return (
        <div className="hero-banner-container">
           <Row className='hero-banner'>
                <Col lg={5} sm={1} className='image-col'>
                    <Image className='hero-image-desktop' src={bannerImage} />
                    <Image
                        src={InvexLogo}
                        className='hero-image-mobile'
                    />
                </Col>
                <Col lg={7} sm={1} className='content-col'>
                    {/* <div className='tagline-wrapper'> */}
                        <Image
                            src={InvexLogo}
                            className='app-logo-desktop'
                        />
                        <h1 className='tagline'>
                            Begin your DeFi journey with INVEX
                        </h1>
                    {/* </div> */}
                    
                    <div className='button-wrapper'>
                        <Link to={`defi/baskets`} className="link-btn">
                            Investor
                        </Link>
                        <Link to={`defi/create`} className="link-btn">
                            Index Creator
                        </Link>
                    </div>
                    
                </Col>
           </Row>
        </div>
    );
};

export default HeroBanner;
