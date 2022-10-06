import React from 'react';
import { Container } from 'react-bootstrap';
import Features from '../landingpage/Features';
import HeroBanner from '../landingpage/HeroBanner';
import HowToUse from '../landingpage/HowToUse';
import LandingFooter from '../landingpage/LandingFooter';

const LandingPage = () => {
    return (
        <Container className='component-container landing-page'>
            <HeroBanner />
            <Features />
            <HowToUse />
            <LandingFooter />
        </Container>
    );
};

export default LandingPage;
