import React from 'react';
import { Container } from 'react-bootstrap';
import HeroBanner from './HeroBanner';

const LandingPage = () => {
    return (
        <Container className="component-container landing-page">
            <HeroBanner />
        </Container>
    );
};

export default LandingPage;
