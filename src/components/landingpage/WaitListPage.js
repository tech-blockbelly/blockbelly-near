import React from 'react';
import { 
    Container,
    Row,
    Col,
    Image,
    Button,
    Form
} from 'react-bootstrap';
import astronaut from '../../assets/images/Astronaut3.png';

const WaitListPage = ({ onSubmit, onChange, email, name }) => {
    return (
        <Container className='component-container waitlist-page'>
           <Row className='waitlist-wrapper'>
                <Col lg={7} sm={1} className='content-col'>
                    <h1 className='content-header'>Join the <span className='gradient-text'>Waitlist</span></h1>
                    <Form className='waitlist-form' onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                className="waitlist-input form-input"
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                className="waitlist-input form-input"
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                required
                            />
                        </Form.Group>
                        <div className="button-wrapper">
                            <Button className="join-btn gradient-btn" type="submit">
                                Join the waitlist
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col lg={5} sm={1} className='image-col'>
                    <Image className='waitlist-image-desktop' src={astronaut} />
                </Col>
           </Row>
        </Container>
    );
};

export default WaitListPage;
