import React from 'react';
import { Row, Col, Image,  Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import bannerImage from '../../assets/images/Astronaut5.png';
import InvexLogo from '../../assets/images/indexLogos/Invex.png';

const BetaUserPage = () => {
    return (
        <Container className='component-container beta-user-page'>
            <div className="beta-container">
            <Row className='beta'>
                    <Col lg={5} className='image-col'>
                        <Image className='image-desktop' src={bannerImage} />
                        <Image
                            src={InvexLogo}
                            className='image-mobile'
                        />
                    </Col>
                    <Col lg={7} className='content-col'>
                        {/* <div className='tagline-wrapper'> */}
                            <Image
                                src={InvexLogo}
                                className='app-logo-desktop'
                            />
                            <h1 className='tagline'>
                                Begin your DeFi journey with <span className='gradient-text'>INVEX</span>
                            </h1>
                        {/* </div> */}
                        
                        <div className='button-wrapper'>
                            <Link to={`defi/baskets`} className="link-btn gradient-btn">
                                Investor
                            </Link>
                            <Link to={`defi/create`} className="link-btn gradient-btn">
                                Index Creator
                            </Link>
                        </div>
                        
                    </Col>
            </Row>
            </div>
        </Container>
    );
};

export default BetaUserPage;
