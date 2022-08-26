import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab, Image, Button } from 'react-bootstrap';
import { IoWallet } from 'react-icons/io5';
import FundsListing from '../dashboard/newcomponents/FundsListing';

// require('@solana/wallet-adapter-react-ui/styles.css');

const NearContainer = (props) => {
    return (
        <FundsListing type="defi" {...props} />
    );
};

const DeFiExchangeContainer = () => {
    // const [key, setKey] = useState('near');
    const [fundsRepo, setFundsRepo] = useState({});

    const fetchRepository = () => {
        fetch("/indexrepository.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setFundsRepo(data[0])
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchRepository();
    }, []);

    return (
        <Container fluid className="module-container">
            <div className="module-header">
                <h2 className="module-title">Explore NEAR Indices</h2>
                {/* <Button
                    action
                    className="purple-btn"
                    onClick={() => connectWallet()}>
                    <IoWallet />{' '}
                    <span>Connect to NEAR Wallet</span>
                </Button> */}
            </div>
            <Container fluid className="funds-tab-container">
                <NearContainer funds={fundsRepo.Near} />
            </Container>
        </Container>
    );
};

export default DeFiExchangeContainer;
