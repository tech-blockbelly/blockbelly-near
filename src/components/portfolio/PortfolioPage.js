import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Col, Container, Row, Spinner, Image, ListGroup, Form, ListGroupItem } from 'react-bootstrap';
import { IoChevronBack, IoBagCheck, IoLogOut, IoWallet, IoFlameSharp, IoHammerSharp } from 'react-icons/io5';
import DistributionTable from './DistributionTable';
import axios from 'axios';

import { 
    initContract, 
    login,
    logout,
    fetchMetadata, 
    fetchMinInvestment, 
    fetchTotalSupply,
    fetchTokenAllocation,
    fetchAccountBalance,
    buyToken,
    callBof,
    updateBaseprice,
    burnToken,
    initRefContract,
    callftTransfer,
    fetchRefConMetadata
} from '../../abi/near/utils';

import SuccessModal from '../common/SuccessModal';
import ErrorModal from '../common/ErrorModal';

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
    const [appState, setAppState] = useState({
        loading: true,
        fund: {},
        account: '',
        balance: 0,
        showMessage: false
    });

    const flow = () => {
        if (window.walletConnection.isSignedIn()){
            console.log("Signed In", appState.account);
            if (!appState.account) {
                setAppState({ ...appState, account: window.walletConnection.getAccountId() });
                setUpdateBalance(true)
            }
        }
    }

    window.nearInitPromise = initContract()
                                .then(flow)
                                .then(initRefContract)
                                .catch(console.error)

    let { i } = useQuery();
    let { chn, id } = useParams();
    const history = useHistory();
    const [hasPdf, setHasPdf] = useState(false);

    //Transaction messages
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [ updateBalance, setUpdateBalance ] = useState(false);

    //fetches Index information
    useEffect(() => {
        setAppState({ ...appState, loading: true });
        fetch("/indexrepository.json")
            .then((res) => {
                let data = res.data[0]
                let index = data[capitalizeFirstLetter(chn)][id];
                setAppState({ ...appState, loading: false, fund: index });
            })
            .catch((err) => console.log(err));
    }, [id]);

    // useEffect(() => {
    //     if (appState.account && !appState.balance) {
    //         console.log('Account set, balance not set');
    //         showAccountBalance()
    //     }
    // }, [updateBalance]);

    /** NEAR Wallet Connection Script */
    const connectWallet = () => {
        setAppState({ ...appState, loading: true });
        if (!window.walletConnection.isSignedIn()) {
            login()
                .then(setAppState({ ...appState, loading: false, account: window.walletConnection.getAccountId(),balance: showAccountBalance() }))
                // .then(showAccountBalance)
                .catch(console.error)
        }

        // window.nearInitPromise = 
        // initContract()
        // .then(resp => console.log(resp))
        // .then(flow)
        // .then(showMetadata)
        // .then(showMinInvestment)
        // .then(showTotalSupply)
        // .then(showTokenAllocation)
        // .catch(console.error)
    }

    const showMetadata = () => {
        fetchMetadata()
        .then((resp) => console.log(resp));
    }

    const showMinInvestment = () => {
        fetchMinInvestment()
        .then((resp) => console.log(resp));
    }

    const showTotalSupply = () => {
        fetchTotalSupply()
        .then((resp) => console.log(resp));
    }

    const showTokenAllocation = () => {
        fetchTokenAllocation()
        .then((resp) => console.log(resp));
    }

    const runCallBof = () => {
        callBof()
        .then((resp) => console.log(resp));
    }

    

    const showAccountBalance = () => {
        console.log('showAccountBalance called ');
        fetchAccountBalance(appState.account)
        .then((resp) => {
            let balance = parseInt(resp)
            let actualBalance = balance/ Math.pow(10, 24)
            setAppState({ ...appState, loading: false, balance: actualBalance.toFixed(2) })
            setUpdateBalance(false)
            console.log(actualBalance.toFixed(2))
        })
    }

    const processTransaction = () => {
        setAppState({ ...appState, loading: true });

        buyToken()
        .then((resp) => {
            setAppState({ ...appState, loading: false });
            console.log(resp);
            if(resp.includes('error')) {
                setShowSuccess(false);
                setShowError(true);
                setErrorMessage(resp)
            } else {
                setShowSuccess(true);
                setShowError(false);
                setSuccessMessage('Token has successfully been minted to you account')
            }
            setUpdateBalance(true)
        })
        .then(showAccountBalance)
    }

    const processSell = () => {
        // make another call to another contract
        //if succesful, proceed with buy_token

        // runCallBof()
        // callftTransfer()
        fetchRefConMetadata()
        .then(resp => console.log(resp))
        .then(console.log(window.contract.contractId))
        .then(callftTransfer)
        .then(tresp => console.log(tresp))

        // setAppState({ ...appState, loading: true });
        // burnToken()
        // .then((resp) => {
        //     setAppState({ ...appState, loading: false });
        //     console.log(resp);
        //     if(resp.includes('error')) {
        //         setShowSuccess(false);
        //         setShowError(true);
        //         setErrorMessage(resp)
        //     } else {
        //         setShowSuccess(true);
        //         setShowError(false);
        //         setSuccessMessage(resp)
        //     }
        //     setUpdateBalance(true)
        // })
        // .then(showAccountBalance)
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

    let buyBtnText = 'Mint 1 NECO'
    let buyInputPlaceHolder = "0.00 " + appState.fund['iSym']

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
                            {/* <Col className="market-info-column" xl={4}>
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
                            </Col> */}
                        </Row>
                        <Row className="information-row">
                            <h4 className="title">Allocations</h4>
                            <DistributionTable
                                {...props}
                                tokens={appState.fund['iCmp']}
                            />
                        </Row>
                        <Row className="information-row">
                            <h4 className="title">Overview</h4>
                            <div className="information-text">
                                {appState.fund['iDesc']}
                            </div>
                        </Row>
                        <Row className="information-row">
                            <h4 className="title">Methodology</h4>
                            <div className="information-text" dangerouslySetInnerHTML={{__html:appState.fund['iMethodology']}}>
                            </div>
                        </Row>
                        <Row className="information-row">
                            <div className="information-text">
                                Click to view detailed <a href = {necoPdf} target='_blank' className='pdf-link'>factsheet</a>
                            </div>
                        </Row>
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
                                        <p className="info-value">{appState.account}</p>
                                    </ListGroupItem>
                                    {appState.balance ? (
                                        <ListGroupItem>
                                            <p>Account Balance: </p>
                                            <p className="info-value">{appState.balance} NECO</p>
                                        </ListGroupItem>
                                    ) : ''}
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col className="portfolio-info-container defi-buy">
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
                                                placeholder="0.00 USDC"
                                                name="paymentIndex"
                                                readOnly
                                                // required
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
                            </Col> */}
                        </Row>
                        <ListGroup className="fund-action-list-group">
                        {/* { window.walletConnection.isSignedIn() ? ( */}
                            {appState.account ? (
                                <Fragment>
                                    <ListGroup.Item
                                        action
                                        onClick={processTransaction}
                                        className="fund-action-container accent"
                                        eventKey="buy">
                                        <IoHammerSharp /> {buyBtnText}
                                    </ListGroup.Item>
                                    {/** If account has balance, then show burn button */}
                                    <ListGroup.Item
                                        action
                                        onClick={processSell}
                                        className="fund-action-container accent"
                                        eventKey="burn">
                                        <IoFlameSharp /> Burn 1 NECO
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        action
                                        onClick={logout}
                                        // onClick={processFtTransfer}
                                        className="fund-action-container accent">
                                        <IoLogOut /> Logout
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

            <SuccessModal
                show={showSuccess}
                onHide={() => setShowSuccess(false)}
                action={() => {
                    setShowSuccess(false);
                }}
                actionText="Close"
                msg={successMessage}
            />
            <ErrorModal
                show={showError}
                onHide={() => setShowError(false)}
                msg={errorMessage}
                action={() => {
                    setShowError(false);;
                }}
                actionText="Close"
            />
        </Container>
    );
};

const PortfolioContainer = (props) => {
    return (
        <PortfolioPage {...props} />
    );
};

export default PortfolioContainer;
