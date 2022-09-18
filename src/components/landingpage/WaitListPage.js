import React, { useState } from 'react';
import { 
    Container,
    Row,
    Col,
    Image,
    Button,
    Form,
    Spinner
} from 'react-bootstrap';
import {putData} from '../../data/AwsFunctions'

import astronaut from '../../assets/images/Astronaut3.png';

const WaitListPage = () => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
    });
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [status, setStatus] = useState('');

    const [statusContent, setStatusContent] = useState({
        buttonText: '',
        message: '',
    });

    const { email, name } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const addDataToDynamoDB = async (formData) => {
        return putData(formData)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        addDataToDynamoDB(formData)
        .then((resp) => {
            setLoading(false);
            setShowMessage(true);
            setStatusContent({
                buttonText: 'Continue',
                message: 'Thank you signing up to our waitlist. You will hear from us soon',
            });
            setStatus('success');
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            setShowMessage(true);
            setStatusContent({
                buttonText: 'Retry',
                message: 'There has been some error. Please try again',
            })
            setStatus('failed');
        })
        setValidated(true);
    };

    const handleClick = () => {
        if (status == 'success') {
            window.location.href = '/';
        } else {
            window.location.reload(false);
        }
    }

    return (
        <Container className='component-container waitlist-page'>
            {loading ? (
                <div className="loader-container">
                    <Spinner
                        className="loader"
                        animation="border"
                        role="status"
                    ></Spinner>
                </div>
            ) : (
                <Row className='waitlist-wrapper'>
                    <Col lg={7} className='content-col'>
                        <h1 className='content-header'>Join the <span className='gradient-text'>Waitlist</span></h1>
                        { showMessage ? (
                            <div className='message-wrapper'>
                                <h4 className='message'>{statusContent.message}</h4>
                                <Button className="reload-btn gradient-btn" onClick = {handleClick}>
                                    {statusContent.buttonText}
                                </Button>
                            </div>
                        ) : (
                            <Form className='waitlist-form' noValidate validated={validated} onSubmit={handleSubmit} >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        className="waitlist-input form-input"
                                        required
                                        type="text"
                                        placeholder="Enter name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => onChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide your name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        className="waitlist-input form-input"
                                        required
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => onChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email id.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="button-wrapper">
                                    <Button className="join-btn gradient-btn" type="submit">
                                        Join the waitlist
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Col>
                    <Col lg={5} className='image-col'>
                        <Image className='waitlist-image-desktop' src={astronaut} />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default WaitListPage;
