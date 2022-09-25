import React from 'react';
import { Row, Col, Image,  Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import astronaut from '../../assets/images/Astronaut2.png';

const Features = () => {
    return (
        <div className="features-banner-container">
           <Row className='features-banner'>
                <Col lg={5} sm={1} className='image-col'>
                    <Image className='feature-image' src={astronaut} />
                </Col>
                <Col lg={7} sm={1} className='features-col'>
                    <h1 className='features-header'>Why <span className='gradient-text'>Invex?</span></h1>
                    <ul className='features-list'>
                        <li className='feature-item'>Easy Onchain Asset Management </li>
                        <li className='feature-item'>Risk Diversification</li>
                        <li className='feature-item'>Infrastructure to create indexes </li>
                        <li className='feature-item'>Infrastructure to buy / sell indexes</li>
                    </ul>
            
                </Col>
           </Row>
        </div>
    );
};

export default Features;


 

