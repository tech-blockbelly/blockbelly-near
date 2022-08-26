import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InvexLogo from '../../assets/images/indexLogos/Invex.png'

const LandingPage = () => {
    return (
        <Container
            className="component-container landing-page"
            style={{ backgroundImage: "url('/technology.jpg')" }}
        >
            <div className='overlay'></div>
            <div className='header-block'>
                <Image
                    src={InvexLogo}
                    className='app-logo'
                />
                <h3>Crypto Indices and curated portfolios aggregated in NEAR</h3>
            </div>
            
            <div className="type-block">
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
