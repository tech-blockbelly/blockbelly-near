import React from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import bbLogo from '../../assets/images/indexLogos/BB.png'

const LandingPage = () => {
    return (
        <Container className="component-container landing-page">
            <div className='header-block'>
                <Image
                    src={bbLogo}
                    className='bb-logo'
                />
                <h3>
                    Crypto Indices and curated portfolios aggregated in NEAR
                </h3>
            </div>
            
            <div className="type-block">
                {/* <h2>DeFi</h2> */}
                <h5>Choose your role</h5>
                <div className="link-wrapper">
                    <Link to={`defi/baskets`} className="finance-btn">
                        Investor
                    </Link>
                    <Link to={`defi/create`} className="finance-btn">
                        Index Creator
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default LandingPage;
