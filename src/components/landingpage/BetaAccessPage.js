import React from 'react';
import { 
    Container,
    Row,
    Col,
    Image,
    Button,
    Form
} from 'react-bootstrap';

import astronaut from '../../assets/images/Astronaut4.png';

const BetaAccessPage = ({ onSubmit, onChange, email, password }) => {
    return (
        <Container className='component-container beta-access-page'>
           <Row className='beta-access-wrapper'>
                <Col lg={7} sm={1} className='content-col'>
                    <h1 className='content-header'>Beta <span className='gradient-text'>Access</span></h1>
                    <Form className='beta-access-form' onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                className="login-input form-input"
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                className="login-input form-input"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                                required
                            />
                        </Form.Group>
                        <div className="button-wrapper">
                            <Button className="login-btn gradient-btn" type="submit">
                                Connect
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col lg={5} sm={1} className='image-col'>
                    <Image className='beta-access-image-desktop' src={astronaut} />
                </Col>
           </Row>
        </Container>
    );
};

export default BetaAccessPage;
