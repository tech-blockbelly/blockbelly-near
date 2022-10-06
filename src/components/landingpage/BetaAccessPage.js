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
import { Redirect } from 'react-router-dom';
import {fetchData} from '../../data/AwsFunctions';

import astronaut from '../../assets/images/Astronaut4.png';

const BetaAccessPage = () => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        passcode: '',
    });
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showError, setShowError] = useState(false);

    const { email, passcode } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const fetchDataToDynamoDB = async (email) => {
        return fetchData(email);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        fetchDataToDynamoDB(formData.email)
        .then(resp => {
            let data = resp.Items[0];
            if (data.passcode && data.passcode == formData.passcode) {
                setIsAuthenticated(true);
            } else {
                setShowError(true);
            }
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            setShowError(true);
        })
    };

    const reloadPage = () => {
        window.location.reload(false);
    }

    if (isAuthenticated) {
        return <Redirect to={{ pathname: '/beta' }} />;
    }

    return (
        <Container className='component-container beta-access-page'>
            {loading ? (
                <div className="loader-container">
                    <Spinner
                        className="loader"
                        animation="border"
                        role="status"
                    ></Spinner>
                </div>
            ) : (    
                <Row className='beta-access-wrapper'>
                    <Col lg={7} className='content-col'>
                        <h1 className='content-header'>Beta <span className='gradient-text'>Access</span></h1>
                        { showError ? (
                            <div className='error-wrapper'>
                                <h4 className='error-message'>There has been some error. Please try again</h4>
                                <Button className="reload-btn gradient-btn" onClick = {reloadPage}>
                                    Retry
                                </Button>
                            </div>
                        ) : (
                        <Form className='beta-access-form'  noValidate validated={validated} onSubmit={handleSubmit} >
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
                                    name="passcode"
                                    value={passcode}
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
                        )}
                    </Col>
                    <Col lg={5} className='image-col'>
                        <Image className='beta-access-image-desktop' src={astronaut} />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default BetaAccessPage;
