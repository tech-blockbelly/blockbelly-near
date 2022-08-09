import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Col, Container, Row, Spinner, Image, ListGroup, Form, ListGroupItem } from 'react-bootstrap';
import { IoChevronBack, IoBagCheck, IoLogOutOutline, IoWallet } from 'react-icons/io5';
import DistributionTable from './DistributionTable';
import axios from 'axios';
import { initContract, fetchMetadata,fetchMinInvestment } from '../../abi/near/utils';
import TransactionPage from '../transaction/TransactionPage';

import makerLogo from '../../assets/images/indexLogos/AlphaGen.png';
import nearLogo from '../../assets/images/near-protocol.svg';
import necoPdf from '../../assets/pdfs/NECO.pdf';;


/* A custom hook that builds on useLocation to parse
 the query string for you. */
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const PortfolioPage = (props) => {
    let { i } = useQuery();
    let { chn, id } = useParams();
    const history = useHistory();
    const [hasPdf, setHasPdf] = useState(false);

    const [appState, setAppState] = useState({
        loading: true,
        // loading: false,
        fund: {},
    });
    
    const [modalShow, setModalShow] = useState(false);
    const handleShow = () => {
        setModalShow(true);
        showMetadata();
        showMinInvestment();
    };

    useEffect(() => {
        setAppState({ ...appState, loading: true });
        axios
            .get(" http://localhost:3000/indexrepository.json")
            .then((res) => {
                let data = res.data[0]
                let index = data[capitalizeFirstLetter(chn)][id];
                setAppState({ ...appState, loading: false, fund: index });
            })
            .catch((err) => console.log(err));
    }, [id]);
    // }, [id, i, props]);

    /** NEAR Wallet Connection Script */
    const [account, setAccount] = useState('');

    const flow = () => {
        if (window.walletConnection.isSignedIn()){
            console.log("Signed In", account);
            if (!account) {
                setAccount(window.walletConnection.getAccountId());
            }
            // walletConnection.signOut();
        }else{
            console.log("Requesting Sign in");
            window.walletConnection.requestSignIn({
                contractId: "dev-1659704680899-56318775491014",
                methodNames: [], // optional
                successUrl: "http://localhost:3000/defi/baskets/near/0", // optional redirect URL on success
                failureUrl: "http://localhost:3000/defi/baskets" // optional redirect URL on failure
            });
        }
    }

    useEffect(() => {
        console.log(account + " has beeen set");
        // if (window.walletConnection.isSignedIn()) {
        //     console.log(fetchMetadata());
        // }
    }, [account]);

    const connectWallet = () => {
        // window.nearInitPromise = 
        initContract()
        .then(flow)
        .catch(console.error)
    }

    const showMetadata = () => {
        fetchMetadata()
        .then((resp) => console.log(resp));
    }

    const showMinInvestment = () => {
        fetchMinInvestment()
        .then((resp) => console.log(resp));
    }
    /** NEAR Wallet Connection Script */



    if(!appState.fund.creatorIcon) {
        appState.fund.creatorIcon = makerLogo;
    }
    if (!appState.fund.icon) {
        appState.fund.icon = nearLogo;
        appState.fund.pdfLink = necoPdf;
        setHasPdf(true);
    }

    let buyBtnText = 'Mint'
    let buyInputPlaceHolder = "0.000000 " + appState.fund['iSym']

    return (
        <Container fluid className="module-container portfolio-page-container">
            <a onClick={history.goBack}>
                <h2 className="module-title">
                    <IoChevronBack /> Explore
                </h2>
            </a>
            {appState.loading && appState.fund ? (
                <div className="loader-container">
                    <Spinner
                        className="loader"
                        animation="border"
                        role="status"></Spinner>
                </div>
            ) : (
                <Row>
                    <Col xl={7} className="information-column">
                        <Row className="title-info-row">
                            <Image
                                src={appState.fund['icon']}
                                roundedCircle
                                className="icon"
                            />
                            <div className="title-block">
                                <h2>{appState.fund['iName']}</h2>
                                <h5>{appState.fund['iSym']}</h5>
                            </div>
                        </Row>
                        <Row className="general-info-row">
                            <Col className="creator-info-column" xl={4}>
                                <Image
                                    className="creator-icon"
                                    src={appState.fund['creatorIcon']}
                                    roundedCircle
                                />
                                <div>
                                    <p className="creator-name">{appState.fund['creator']}</p>
                                    <p className="subtext">Creator</p>
                                </div>
                            </Col>
                            <Col className="market-info-column" xl={4}>
                                <p className="market-cap">
                                    $
                                    {
                                        // appState.fund['market_data'][
                                        //     'market_cap'
                                        // ]['usd']
                                        Math.floor(1000 + Math.random() * 9000)
                                    }
                                </p>
                                <p className="subtext">Market Cap</p>
                            </Col>
                        </Row>
                        <Row className="information-row">
                            {/* <PortfolioFinancials 
                                fund={appState.fund}
                                endpoint={""}
                                type={"defi"}
                            /> */}
                            <h4 className="title">Allocations</h4>
                            <DistributionTable
                                {...props}
                                tokens={appState.fund['iCmp']}
                            />
                        </Row>
                        <Row className="information-row">
                            <h4 className="title">Overview</h4>
                            <div className="information-text">
                                {/* {appState.fund['description']['en']} */}
                                {appState.fund['iDesc']}
                            </div>
                        </Row>
                        <Row className="information-row">
                            <h4 className="title">Methodology</h4>
                            <div className="information-text" dangerouslySetInnerHTML={{__html:appState.fund['iMethodology']}}>
                            </div>
                        </Row>
                        {/* pdf code fails on non-BB indices. Needs to be rechecked */}
                        {/* {
                            hasPdf ? ( */}
                                <Row className="information-row">
                                    <div className="information-text">
                                        Click to view detailed <a href = {necoPdf} target='_blank' className='pdf-link'>factsheet</a>
                                    </div>
                                </Row>
                            {/* ) : {}
                        } */}
                    </Col>
                    <Col xl={5} className="transaction-column">
                        <div className="fixed-column">
                        <Row>
                            <Col className="portfolio-info-container wallet-info">
                                <ListGroup
                                    flush
                                    className="wallet-info-block">
                                    <ListGroupItem>
                                        <p>Account Id:</p>
                                        <p className="info-value">{account}</p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <p>Account Balance: </p>
                                        <p className="info-value">0 NECO</p>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="portfolio-info-container defi-buy">
                                <ListGroup className="fund-action-list-group">
                                    <ListGroup.Item style={{ border: '0' }}>
                                        <Form.Group controlId="pay-with-input">
                                            <Form.Label
                                                style={{
                                                    'font-size': 'larger',
                                                }}>
                                                Pay With
                                            </Form.Label>
                                            <Form.Control
                                                className="pay-with-input form-input"
                                                type="text"
                                                placeholder="0.000000 USDC"
                                                name="paymentIndex"
                                                required
                                            />
                                        </Form.Group>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{ border: '0' }}>
                                        <Form.Group controlId="buy-input">
                                            <Form.Label
                                                style={{
                                                    'font-size': 'larger',
                                                }}>
                                                Bid
                                            </Form.Label>
                                            <Form.Control
                                                className="buy-input form-input"
                                                type="text"
                                                placeholder= {buyInputPlaceHolder}
                                                name="buyIndex"
                                                readOnly
                                            />
                                        </Form.Group>
                                    </ListGroup.Item>
                                </ListGroup>
                                {/* <ListGroup
                                    flush
                                    className="transaction-breakup-block">
                                    <ListGroupItem>
                                        Minimum Receive
                                        <p>0.00000</p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Network Fee
                                        <p>0.000 USDC</p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Platform Fee
                                        <p>0.000 USDC</p>
                                    </ListGroupItem>
                                </ListGroup> */}
                            </Col>
                        </Row>
                        <ListGroup className="fund-action-list-group">
                            {/* { window.walletConnection.isSignedIn() ? ( */}
                            {account ? (
                                <Fragment>
                                    <ListGroup.Item
                                        action
                                        // onClick={(e) => {
                                        //     e.preventDefault();
                                        //     window.location.href = `/invest/${id}`;
                                        // }}
                                        onClick={handleShow}
                                        // onClick={showMetadata}
                                        className="fund-action-container accent"
                                        eventKey="buy">
                                        <IoBagCheck /> {buyBtnText}
                                    </ListGroup.Item>
                                    {/** If accoount has balance, then show burn button */}
                                    <ListGroup.Item
                                        action
                                        onClick={handleShow}
                                        className="fund-action-container accent"
                                        eventKey="burn">
                                        <IoBagCheck /> Burn 
                                    </ListGroup.Item>
                                </Fragment>
                            ) : (
                                <ListGroup.Item
                                    action
                                    className="fund-action-container accent"
                                    onClick={() => connectWallet()}>
                                    <IoWallet />{' '}
                                    <span>Connect to NEAR Wallet</span>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        </div>
                    </Col>
                </Row>
            )}

            <TransactionPage
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
                action="buy"
                account={account}
                // type={endpoint}
            />
        </Container>
    );
};

const PortfolioContainer = (props) => {
    return (
        // <DAppProvider config={config}>
            <PortfolioPage {...props} />
        // </DAppProvider>
    );
};

export default PortfolioContainer;
