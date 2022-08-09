import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Container, Row, Col, Tabs, Tab, Image, Button } from 'react-bootstrap';
import { IoWallet } from 'react-icons/io5';
import FundsListing from '../dashboard/newcomponents/FundsListing';

import nearLogo from '../../assets/images/near-protocol.svg';

const NearContainer = (props) => {
    return (
        <FundsListing type="defi" {...props} />
    );
};

const DeFiExchangeContainer = () => {
    const [key, setKey] = useState('near');
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
        fetchRepository()
    }, []);

    return (
        <Container fluid className="module-container">
            <h2 className="module-title">Explore Indices</h2>
            <Container fluid className="funds-tab-container">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="funds-type-tab">
                    <Tab 
                        eventKey="near" 
                        title={
                            <span className="tab-title">
                                <Image className="tab-logo" src={nearLogo}/>
                                Near
                            </span>
                    }>
                        <NearContainer funds={fundsRepo.Near} />
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    );
};

export default DeFiExchangeContainer;
