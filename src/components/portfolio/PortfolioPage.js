import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Spinner,
  Image,
  ListGroup,
  FormControl,
  ListGroupItem,
} from "react-bootstrap";
import {
  IoChevronBack,
  IoBagCheck,
  IoLogOut,
  IoWallet,
  IoFlameSharp,
  IoHammerSharp,
} from "react-icons/io5";
import DistributionTable from "./DistributionTable";

import { connect, WalletConnection, utils, Contract } from "near-api-js";
import { getConfig } from "../../config";

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
  fetchRefConMetadata,
} from "../../abi/near/utils";

import SuccessModal from "../common/SuccessModal";
import ErrorModal from "../common/ErrorModal";

import makerLogo from "../../assets/images/indexLogos/AlphaGen.png";
import nearLogo from "../../assets/images/near-protocol.svg";
import necoPdf from "../../assets/pdfs/NECO.pdf";

/* A custom hook that builds on useLocation to parse
 the query string for you. */
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const {
  format: { formatNearAmount },
} = utils;

// const PortfolioPage = (props) => {
//     const [appState, setAppState] = useState({
//         loading: true,
//         fund: {},
//         account: '',
//         balance: 0,
//         showMessage: false
//     });

//     const flow = () => {
//         if (window.walletConnection.isSignedIn()){
//             console.log("Signed In", appState.account);
//             if (!appState.account) {
//                 setAppState({ ...appState, account: window.walletConnection.getAccountId() });
//                 setUpdateBalance(true)
//             }
//         }
//     }

//     window.nearInitPromise = initContract()
//                                 .then(flow)
//                                 .then(initRefContract)
//                                 .catch(console.error)

//     let { i } = useQuery();
//     let { chn, id } = useParams();
//     const history = useHistory();
//     const [hasPdf, setHasPdf] = useState(false);

//     //Transaction messages
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [showError, setShowError] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [ updateBalance, setUpdateBalance ] = useState(false);
//     const [index, setIndex] = useState(null);

//     //fetches Index information
//     useEffect(() => {
//         setAppState({ ...appState, loading: true });
//         fetch("/indexrepository.json")
//             .then(response => {
//                 return response.json();
//             })
//             .then((data) => {
//                 const index = data[0][capitalizeFirstLetter(chn)][id];
//                 setAppState({ ...appState, loading: false, fund: index });
//                 setIndex(index);
//             })
//             .catch((err) => console.log(err));
//     }, [id]);

//     /** NEAR Wallet Connection Script */
//     const connectWallet = () => {
//         setAppState({ ...appState, loading: true });
//         if (!window.walletConnection.isSignedIn()) {
//             login()
//                 .then(setAppState({ ...appState, loading: false, account: window.walletConnection.getAccountId(),balance: showAccountBalance() }))
//                 // .then(showAccountBalance)
//                 .catch(console.error)
//         }
//     }

//     const showMetadata = () => {
//         fetchMetadata()
//         .then((resp) => console.log(resp));
//     }

//     const showMinInvestment = () => {
//         fetchMinInvestment()
//         .then((resp) => console.log(resp));
//     }

//     const showTotalSupply = () => {
//         fetchTotalSupply()
//         .then((resp) => console.log(resp));
//     }

//     const showTokenAllocation = () => {
//         fetchTokenAllocation()
//         .then((resp) => console.log(resp));
//     }

//     const runCallBof = () => {
//         callBof()
//         .then((resp) => console.log(resp));
//     }

//     const showAccountBalance = () => {
//         console.log('showAccountBalance called ');
//         fetchAccountBalance(appState.account)
//         .then((resp) => {
//             let balance = parseInt(resp)
//             let actualBalance = balance/ Math.pow(10, 24)
//             setAppState({ ...appState, loading: false, balance: actualBalance.toFixed(2) })
//             setUpdateBalance(false)
//             console.log(actualBalance.toFixed(2))
//         })
//     }

//     const processTransaction = () => {
//         setAppState({ ...appState, loading: true });

//         buyToken()
//         .then((resp) => {
//             setAppState({ ...appState, loading: false });
//             console.log(resp);
//             if(resp.includes('error')) {
//                 setShowSuccess(false);
//                 setShowError(true);
//                 setErrorMessage(resp)
//             } else {
//                 setShowSuccess(true);
//                 setShowError(false);
//                 setSuccessMessage('Token has successfully been minted to you account')
//             }
//             setUpdateBalance(true)
//         })
//         .then(showAccountBalance)
//     }

//     const processSell = () => {
//         fetchRefConMetadata()
//         .then(resp => console.log(resp))
//         .then(console.log(window.contract.contractId))
//         .then(callftTransfer)
//         .then(tresp => console.log(tresp))
//     }

//     /** NEAR Wallet Connection Script */

//     const [wallet, setWallet] = useState(null);
//     const [isSignedIn, setIsSignedIn] = useState(false);
//     const [refContract, setRefContract] = useState(null);
//     const [bbContract, setBBContract] = useState(null);
//     const [indexTokens, setIndexTokens] = useState([]);
//     const [amtIn, setAmtIn] = useState(0);
//     const [minIn, setMinIn] = useState(0);
//     const [tokenDist, setTokenDist] = useState(null);
//     const [balance, setBalance] = useState('');

//     // Establish a connection to the NEAR blockchain on component mount
//     useEffect(() => {
//         connect(getConfig()).then((near) => setWallet(new WalletConnection(near)));
//     }, []);

//     // Initialize the contract object when the wallet is available
//     useEffect(() => {
//         if (wallet) {
//             setRefContract(
//                 new Contract(wallet.account(), 'ref-finance-101.testnet', {
//                     viewMethods: [
//                     'get_pools',
//                     'get_pool_total_shares',
//                     'get_deposits',
//                     ],
//                     changeMethods: [],
//                 })
//             );

//             setBBContract(
//                 new Contract(wallet.account(), 'dev-1661065232448-46728115400748', {
//                     viewMethods: [
//                         'ft_metadata',
//                         'ft_total_supply',
//                         'ft_balance_of',
//                         'ft_token_allocation',
//                         'min_investment'],
//                     changeMethods: [
//                         'ft_mint',
//                         'ft_burn',
//                         'sell_token',
//                         'buy_token',
//                         'update_token_allocation',
//                         'update_input_token',
//                         'update_base_price',
//                         'bof'
//                     ],
//                   })
//             );

//             // We can get the account balance of a user through the wallet
//             // Since this is requesting data from the blockchain, the method returns a Promise
//             wallet
//                 .account()
//                 .getAccountBalance()
//                 .then(({ available }) => setBalance(available));

//             const isSignedIn = Boolean(wallet && wallet.isSignedIn() && refContract && bbContract);

//             setIsSignedIn(isSignedIn);
//         }
//     }, [wallet]);

//     // const isSignedIn = Boolean(wallet && wallet.isSignedIn() && refContract && bbContract);

//     // Update the counter value when the contract is available
//     // (which means that the user is signed in and the contract has been initialized)
//     // Calling contract functions is similar to calling API endpoints in traditional web apps
//     // The call happens asynchronously and the result is returned in a Promise
//     useEffect(() => {
//         if (isSignedIn && index) {
//             const compDetails = [];
//             for (const tokenOut of index.iCmp) {
//                 compDetails.push(
//                     refContract
//                         .get_pools({
//                             from_index: tokenOut.pId,
//                             limit: 1,
//                         })
//                 );
//             }
//             Promise.all(compDetails).then(pools => {
//                 setIndexTokens(pools);
//             });
//         }
//     }, [refContract, isSignedIn, index]);

//     useEffect(() => {
//         if (index) {
//             const tokenDistLocal = [];
//             for (let token of indexTokens) {
//             token = token[0];
//             const id = token.token_account_ids.indexOf(index.iTin.addr);
//             const tokenIn = token.token_account_ids[id];
//             const tokenInLiquidity = token.amounts[id];
//             const tokenOut = token.token_account_ids[token.token_account_ids.length-1-id];
//             const tokenOutLiquidity = token.amounts[token.amounts.length-1-id];
//             const tokenOutDetails = index.tokenList.find(token => token.addr == tokenOut);

//             const outWithOneIn = tokenOutLiquidity/tokenInLiquidity;
//             const inForMinOut = (tokenOutDetails.wt * 10 ** (-1*tokenOutDetails.dcm)) / outWithOneIn;
//             const poolFee = token.total_fee / 1000;
//             tokenDistLocal.push({
//                 tokenIn,
//                 tokenOut,
//                 outWithOneIn,
//                 inForMinOut,
//                 poolFee,
//             });
//             }
//             console.log(tokenDistLocal);
//             setTokenDist(tokenDistLocal);
//             let min = 0;
//             for (const dist of tokenDistLocal) {
//                 min += dist.inForMinOut;
//             // console.log(dist.tokenOut,dist.inForMinOut);
//             }
//             setMinIn(min);
//         }
//     }, [index]);

//     // Handle the sign in call by requesting a sign in through the NEAR Wallet
//     const handleLogin = () => {
//         wallet.requestSignIn({
//             contractId: 'ref-finance-101.testnet',
//             methodNames: [
//             'get_pools',
//             'get_pool_total_shares',
//             'get_deposits',
//             ],
//         });
//         wallet.requestSignIn('dev-1661065232448-46728115400748');
//     };

//     useEffect(() => {
//         if (tokenDist) {
//             const platformFee = 0.2/100 * amtIn;
//             const distributorFee = 0.2/100 * amtIn;
//             let swapFee = 0;
//             const actualIn = amtIn - platformFee - distributorFee;
//             const split = [];
//             for(const dist of tokenDist) {
//                 const amtInDist = dist.inForMinOut * actualIn / minIn;
//                 const poolFee = dist.poolFee * amtInDist;
//                 swapFee += poolFee;
//                 const minOut = dist.outWithOneIn * (amtInDist - poolFee)
//                 split.push({
//                     tokenIn: dist.tokenIn,
//                     tokenOut: dist.tokenOut,
//                     poolFee,
//                     minOut,
//                     amtInDist,
//                 })
//             }
//             console.log(
//                 {
//                     amtIn,
//                     distributorFee,
//                     platformFee,
//                     swapFee,
//                     split,
//                 }
//             )
//         }
//     }, [amtIn]);

//     if(!appState.fund.creatorIcon) {
//         appState.fund.creatorIcon = makerLogo;
//     }
//     if (!appState.fund.icon) {
//         appState.fund.icon = nearLogo;
//         appState.fund.pdfLink = necoPdf;
//         setHasPdf(true);
//     }

//     let buyBtnText = 'Mint 1 NECO'
//     let buyInputPlaceHolder = "0.00 " + appState.fund['iSym']

//     return (
//         <Container fluid className="module-container portfolio-page-container">
//             <a onClick={history.goBack}>
//                 <h2 className="module-title">
//                     <IoChevronBack /> Explore
//                 </h2>
//             </a>
//             {appState.loading && appState.fund ? (
//                 <div className="loader-container">
//                     <Spinner
//                         className="loader"
//                         animation="border"
//                         role="status"></Spinner>
//                 </div>
//             ) : (
//                 <Row>
//                     <Col xl={7} className="information-column">
//                         <Row className="title-info-row">
//                             <Image
//                                 src={appState.fund['icon']}
//                                 roundedCircle
//                                 className="icon"
//                             />
//                             <div className="title-block">
//                                 <h2>{appState.fund['iName']}</h2>
//                                 <h5>{appState.fund['iSym']}</h5>
//                             </div>
//                         </Row>
//                         <Row className="general-info-row">
//                             <Col className="creator-info-column" xl={4}>
//                                 <Image
//                                     className="creator-icon"
//                                     src={appState.fund['creatorIcon']}
//                                     roundedCircle
//                                 />
//                                 <div>
//                                     <p className="creator-name">{appState.fund['creator']}</p>
//                                     <p className="subtext">Creator</p>
//                                 </div>
//                             </Col>
//                             {/* <Col className="market-info-column" xl={4}>
//                                 <p className="market-cap">
//                                     $
//                                     {
//                                         // appState.fund['market_data'][
//                                         //     'market_cap'
//                                         // ]['usd']
//                                         Math.floor(1000 + Math.random() * 9000)
//                                     }
//                                 </p>
//                                 <p className="subtext">Market Cap</p>
//                             </Col> */}
//                         </Row>
//                         <Row className="information-row">
//                             <h4 className="title">Allocations</h4>
//                             <DistributionTable
//                                 {...props}
//                                 tokens={appState.fund['iCmp']}
//                             />
//                         </Row>
//                         <Row className="information-row">
//                             <h4 className="title">Overview</h4>
//                             <div className="information-text">
//                                 {appState.fund['iDesc']}
//                             </div>
//                         </Row>
//                         <Row className="information-row">
//                             <h4 className="title">Methodology</h4>
//                             <div className="information-text" dangerouslySetInnerHTML={{__html:appState.fund['iMethodology']}}>
//                             </div>
//                         </Row>
//                         <Row className="information-row">
//                             <div className="information-text">
//                                 Click to view detailed <a href = {necoPdf} target='_blank' className='pdf-link'>factsheet</a>
//                             </div>
//                         </Row>
//                     </Col>
//                     <Col xl={5} className="transaction-column">
//                         <div className="fixed-column">
//                         <Row>
//                             <Col className="portfolio-info-container wallet-info">
//                                 <ListGroup
//                                     flush
//                                     className="wallet-info-block">
//                                     <ListGroupItem>
//                                         <p>Account Id:</p>
//                                         <p className="info-value">{appState.account}</p>
//                                     </ListGroupItem>
//                                     {appState.balance ? (
//                                         <ListGroupItem>
//                                             <p>Account Balance: </p>
//                                             <p className="info-value">{appState.balance} NECO</p>
//                                         </ListGroupItem>
//                                     ) : ''}
//                                 </ListGroup>
//                             </Col>
//                         </Row>
//                         <Row>
//                             {/* <Col className="portfolio-info-container defi-buy">
//                                 <ListGroup className="fund-action-list-group">
//                                     <ListGroup.Item style={{ border: '0' }}>
//                                         <Form.Group controlId="pay-with-input">
//                                             <Form.Label
//                                                 style={{
//                                                     'font-size': 'larger',
//                                                 }}>
//                                                 Pay With
//                                             </Form.Label>
//                                             <Form.Control
//                                                 className="pay-with-input form-input"
//                                                 type="text"
//                                                 placeholder="0.00 USDC"
//                                                 name="paymentIndex"
//                                                 readOnly
//                                                 // required
//                                             />
//                                         </Form.Group>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item style={{ border: '0' }}>
//                                         <Form.Group controlId="buy-input">
//                                             <Form.Label
//                                                 style={{
//                                                     'font-size': 'larger',
//                                                 }}>
//                                                 Bid
//                                             </Form.Label>
//                                             <Form.Control
//                                                 className="buy-input form-input"
//                                                 type="text"
//                                                 placeholder= {buyInputPlaceHolder}
//                                                 name="buyIndex"
//                                                 readOnly
//                                             />
//                                         </Form.Group>
//                                     </ListGroup.Item>
//                                 </ListGroup>
//                             </Col> */}
//                         </Row>
//                         <ListGroup className="fund-action-list-group">
//                         {/* { window.walletConnection.isSignedIn() ? ( */}
//                             {isSignedIn ? (
//                                 <Fragment>
//                                     <ListGroup.Item
//                                         action
//                                         onClick={processTransaction}
//                                         className="fund-action-container accent"
//                                         eventKey="buy">
//                                         <IoHammerSharp /> {buyBtnText}
//                                     </ListGroup.Item>
//                                     {/** If account has balance, then show burn button */}
//                                     <ListGroup.Item
//                                         action
//                                         onClick={processSell}
//                                         className="fund-action-container accent"
//                                         eventKey="burn">
//                                         <IoFlameSharp /> Burn 1 NECO
//                                     </ListGroup.Item>
//                                     <ListGroup.Item
//                                         action
//                                         onClick={logout}
//                                         // onClick={processFtTransfer}
//                                         className="fund-action-container accent">
//                                         <IoLogOut /> Logout
//                                     </ListGroup.Item>
//                                 </Fragment>
//                             ) : (
//                                 <ListGroup.Item
//                                     action
//                                     className="fund-action-container accent"
//                                     onClick={() => handleLogin()}>
//                                     <IoWallet />{' '}
//                                     <span>Connect to NEAR Wallet</span>
//                                 </ListGroup.Item>
//                             )}
//                         </ListGroup>
//                         </div>
//                     </Col>
//                 </Row>
//             )}

//             <SuccessModal
//                 show={showSuccess}
//                 onHide={() => setShowSuccess(false)}
//                 action={() => {
//                     setShowSuccess(false);
//                 }}
//                 actionText="Close"
//                 msg={successMessage}
//             />
//             <ErrorModal
//                 show={showError}
//                 onHide={() => setShowError(false)}
//                 msg={errorMessage}
//                 action={() => {
//                     setShowError(false);;
//                 }}
//                 actionText="Close"
//             />
//         </Container>
//     );
// };

const PortfolioPage = (props) => {
  const { chn, id } = useParams();
  const history = useHistory();

  const [appState, setAppState] = useState({
    loading: true,
    fund: {},
    account: "",
    balance: 0,
    showMessage: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [bbContract, setBBContract] = useState(null);
  const [indexTokens, setIndexTokens] = useState([]);
  const [amtIn, setAmtIn] = useState(0);
  const [minIn, setMinIn] = useState(0);
  const [tokenDist, setTokenDist] = useState(null);
  const [balance, setBalance] = useState("");
  const [updateBalance, setUpdateBalance] = useState(false);

  const [indexDetails, setIndexDetails] = useState(null);
  const [distribution, setDistibution] = useState({});

  //fetches Index information
  useEffect(() => {
    setAppState({ ...appState, loading: true });
    fetch("/indexrepository.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const index = data[0][capitalizeFirstLetter(chn)][id];
        setAppState({ ...appState, loading: false, fund: index });
        setIndexDetails(index);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Establish a connection to the NEAR blockchain on component mount
  useEffect(() => {
    connect(getConfig()).then((near) => setWallet(new WalletConnection(near)));
  }, []);

  // Initialize the contract object when the wallet is available
  useEffect(() => {
    if (wallet) {
      setContract(
        new Contract(wallet.account(), "ref-finance-101.testnet", {
          viewMethods: ["get_pools", "get_pool_total_shares", "get_deposits"],
          changeMethods: [],
        })
      );

      setBBContract(
        new Contract(wallet.account(), "dev-1661065232448-46728115400748", {
          viewMethods: [
            "ft_metadata",
            "ft_total_supply",
            "ft_balance_of",
            "ft_token_allocation",
            "min_investment",
          ],
          changeMethods: [
            "ft_mint",
            "ft_burn",
            "sell_token",
            "buy_token",
            "update_token_allocation",
            "update_input_token",
            "update_base_price",
            "bof",
          ],
        })
      );

      // We can get the account balance of a user through the wallet
      // Since this is requesting data from the blockchain, the method returns a Promise
      wallet
        .account()
        .getAccountBalance()
        .then(({ available }) => setBalance(available));
    }
  }, [wallet]);

  const isSignedIn = Boolean(wallet && wallet.isSignedIn() && contract);

  // Update the counter value when the contract is available
  // (which means that the user is signed in and the contract has been initialized)
  // Calling contract functions is similar to calling API endpoints in traditional web apps
  // The call happens asynchronously and the result is returned in a Promise
  useEffect(() => {
    if (isSignedIn && indexDetails) {
      const compDetails = [];
      for (const tokenOut of indexDetails.iCmp) {
        compDetails.push(
          contract.get_pools({
            from_index: tokenOut.pId,
            limit: 1,
          })
        );
      }
      Promise.all(compDetails).then((pools) => {
        setIndexTokens(pools);
      });
    }
  }, [contract, isSignedIn, indexDetails]);

  useEffect(() => {
    if (indexTokens.length > 0) {
      const tokenDistLocal = [];
      for (let token of indexTokens) {
        token = token[0];
        const id = token.token_account_ids.indexOf(indexDetails.iTin.addr);
        const tokenIn = token.token_account_ids[id];
        const tokenInLiquidity = token.amounts[id];
        const tokenOut =
          token.token_account_ids[token.token_account_ids.length - 1 - id];
        const tokenOutLiquidity = token.amounts[token.amounts.length - 1 - id];
        const tokenOutDetails = indexDetails.iCmp.find(
          (token) => token.addr == tokenOut
        );

        const outWithOneIn = tokenOutLiquidity / tokenInLiquidity;
        const inForMinOut =
          Math.ceil(((tokenOutDetails.wt * 10 ** (-1 * tokenOutDetails.dcm)) /
          outWithOneIn) * 10 ** indexDetails.iTin.dcm);
        console.log(inForMinOut, tokenOut)
        const poolFee = token.total_fee / 1000;
        tokenDistLocal.push({
          tokenIn,
          tokenOut,
          outWithOneIn,
          inForMinOut,
          poolFee,
        });
      }
      setTokenDist(tokenDistLocal);
      let min = 0;
      for (const dist of tokenDistLocal) {
        min += dist.inForMinOut;
      }
      setMinIn(min);
    }
  }, [indexTokens]);

  useMemo(() => {
    if (tokenDist && indexDetails) {
      const tkInDCM = indexDetails.iTin.dcm;
      const amountIn = 1 * 10 ** tkInDCM;
      const platformFee = (0.2 / 100) * 1;
      const distributorFee = (0.2 / 100) * 1;
      let swapFee = 0;
      const actualIn = 1 - platformFee - distributorFee;
      const split = [];
      for (const dist of tokenDist) {
        const amtInDist = (dist.inForMinOut * actualIn) / minIn;
        const poolFee = dist.poolFee * amtInDist;
        swapFee += poolFee;
        const minOut = dist.outWithOneIn * (amtInDist - poolFee);
        split.push({
          tokenIn: dist.tokenIn,
          tokenOut: dist.tokenOut,
          poolFee,
          minOut,
          amtInDist,
        });
      }
      console.log({
        amountIn,
        distributorFee,
        platformFee,
        swapFee,
        split,
      })
      setDistibution({
        amountIn,
        distributorFee,
        platformFee,
        swapFee,
        split,
      });
    }
  }, [tokenDist]);

  // Handle the sign in call by requesting a sign in through the NEAR Wallet
  const handleLogin = () => {
    wallet.requestSignIn({
      contractId: "ref-finance-101.testnet",
      methodNames: ["get_pools", "get_pool_total_shares", "get_deposits"],
    });
    wallet.requestSignIn('dev-1661065232448-46728115400748');
  };

  const showAccountBalance = () => {
    console.log("showAccountBalance called ");
    fetchAccountBalance(appState.account).then((resp) => {
      let balance = parseInt(resp);
      let actualBalance = balance / Math.pow(10, 24);
      setAppState({
        ...appState,
        loading: false,
        balance: actualBalance.toFixed(2),
      });
      setUpdateBalance(false);
      console.log(actualBalance.toFixed(2));
    });
  };

  const processTransaction = () => {
    setAppState({ ...appState, loading: true });

    buyToken(distribution, bbContract)
      .then((resp) => {
        setAppState({ ...appState, loading: false });
        console.log(resp);
        if (resp.includes("error")) {
          setShowSuccess(false);
          setShowError(true);
          setErrorMessage(resp);
        } else {
          setShowSuccess(true);
          setShowError(false);
          setSuccessMessage(
            "Token has successfully been minted to you account"
          );
        }
        setUpdateBalance(true);
      })
      .then(showAccountBalance);
  };

  const processSell = () => {
    fetchRefConMetadata()
      .then((resp) => console.log(resp))
      .then(console.log(window.contract.contractId))
      .then(callftTransfer)
      .then((tresp) => console.log(tresp));
  };

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
            role="status"
          ></Spinner>
        </div>
      ) : (
        <Row>
          <Col xl={7} className="information-column">
            <Row className="title-info-row">
              <Image
                src={appState.fund["icon"]}
                roundedCircle
                className="icon"
              />
              <div className="title-block">
                <h2>{appState.fund["iName"]}</h2>
                <h5>{appState.fund["iSym"]}</h5>
              </div>
            </Row>
            <Row className="general-info-row">
              <Col className="creator-info-column" xl={4}>
                <Image
                  className="creator-icon"
                  src={appState.fund["creatorIcon"]}
                  roundedCircle
                />
                <div>
                  <p className="creator-name">{appState.fund["creator"]}</p>
                  <p className="subtext">Creator</p>
                </div>
              </Col>
            </Row>
            <Row className="information-row">
              <h4 className="title">Allocations</h4>
              <DistributionTable {...props} tokens={appState.fund["iCmp"]} />
            </Row>
            <Row className="information-row">
              <h4 className="title">Overview</h4>
              <div className="information-text">{appState.fund["iDesc"]}</div>
            </Row>
            <Row className="information-row">
              <h4 className="title">Methodology</h4>
              <div
                className="information-text"
                dangerouslySetInnerHTML={{
                  __html: appState.fund["iMethodology"],
                }}
              ></div>
            </Row>
            <Row className="information-row">
              <div className="information-text">
                Click to view detailed{" "}
                <a
                  href={necoPdf}
                  target="_blank"
                  className="pdf-link"
                  rel="noreferrer"
                >
                  factsheet
                </a>
              </div>
            </Row>
          </Col>
          <Col xl={5} className="transaction-column">
            <div className="fixed-column">
              <Row>
                <Col className="portfolio-info-container wallet-info">
                  <ListGroup flush className="wallet-info-block">
                    <ListGroupItem>
                      <div className="transaction-input-block">
                        <h5 className="block-title">
                          Token Value:
                        </h5>
                        <h4 className="block-title">
                          {indexDetails? (minIn || 0)*10 ** (-1*indexDetails.iTin.dcm) + " " +indexDetails.iTin.cName.toUpperCase() : 0}
                        </h4>
                      </div>
                    </ListGroupItem>
                    {appState.balance ? (
                      <ListGroupItem>
                        <p>Account Balance: </p>
                        <p className="info-value">{appState.balance} NECO</p>
                      </ListGroupItem>
                    ) : (
                      ""
                    )}
                  </ListGroup>
                </Col>
              </Row>
              <Row></Row>
              <ListGroup className="fund-action-list-group">
                {/* { window.walletConnection.isSignedIn() ? ( */}
                {isSignedIn ? (
                  <Fragment>
                    <ListGroup.Item
                      action
                      onClick={processTransaction}
                      className="fund-action-container accent"
                      eventKey="buy"
                    >
                      <IoHammerSharp /> Mint 1 {indexDetails ? indexDetails.iSym : ''}
                    </ListGroup.Item>
                    {/** If account has balance, then show burn button */}
                    <ListGroup.Item
                      action
                      onClick={processSell}
                      className="fund-action-container accent"
                      eventKey="burn"
                    >
                      <IoFlameSharp /> Burn 1 {indexDetails ? indexDetails.iSym : ''}
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      onClick={logout}
                      // onClick={processFtTransfer}
                      className="fund-action-container accent"
                    >
                      <IoLogOut /> Logout
                    </ListGroup.Item>
                  </Fragment>
                ) : (
                  <ListGroup.Item
                    action
                    className="fund-action-container accent"
                    onClick={() => handleLogin()}
                  >
                    <IoWallet /> <span>Connect to NEAR Wallet</span>
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
          setShowError(false);
        }}
        actionText="Close"
      />
    </Container>
  );
};

const PortfolioContainer = (props) => {
  return <PortfolioPage {...props} />;
};

export default PortfolioContainer;
