import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from 'react-router-dom';

import Header from './components/common/Header';
import NavigationMenu from './components/common/NavigationMenu';
import Footer from './components/common/Footer';
// import DashboardPage from './components/dashboard/DashboardPage';
// import TransactionPage from './components/transaction/TransactionPage';
import StatusPage from './components/transaction/StatusPage';
// import ExchangePage from './components/connectexchange/ExchangePage';
import PortfolioPage from './components/portfolio/PortfolioPage';
import PortfoliosListPage from './components/portfolio/PortfoliosListPage';
// import SettingsPage from './components/settings/SettingsPage';
import ErrorPage from './components/common/ErrorModule';
import InvesmentPage from './components/portfolio/InvestmentPage';
import CreatePage from './components/createportfolio/CreatePage';
// import DeFiExchangePage from './components/connectexchange/DeFiExchangePage';
import LandingPage from './components/common/LandingPage';
import WaitListPage from './components/landingpage/WaitListPage';
import BetaAccessPage from './components/landingpage/BetaAccessPage';

// import Layout from './hocs/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import BasketListContainer from './components/exchange/BasketListContainer';
import DeFiExchangeContainer from './components/exchange/DeFiExchangeContainer';
// import BasketContainer from './components/exchange/BasketContainer';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

function App() {
    return (
        <div className="App">
            <Router>
                <div className="page-container">
                    <NavigationMenu />
                    <div className="content-container">
                        {/* <Header></Header> */}
                        <Switch>
                            <Route exact path="/">
                                {/* <Redirect to="/baskets" /> */}
                                <LandingPage />
                            </Route>
                            <Route exact path="/waitlist">
                                {/* <Redirect to="/baskets" /> */}
                                <WaitListPage />
                            </Route>
                            <Route exact path="/betaaccess">
                                {/* <Redirect to="/baskets" /> */}
                                <BetaAccessPage />
                            </Route>
                            <Route exact path="/:type/baskets">
                                {/* <DeFiExchangeContainer /> */}
                                <BasketListContainer />
                            </Route>
                            {/* <Route exact path="/baskets/:id"> */}
                            <Route exact path="/:type/baskets/:chn/:id">
                                {/* <BasketContainer /> */}
                                <PortfolioPage />
                            </Route>
                            <Route exact path="/:type/create">
                                <CreatePage />
                            </Route>
                            {/* <Route exact path="/ledger">
                                    <DashboardPage />
                                </Route>
                                <Route exact path="/ledger/:id">
                                    <InvesmentPage />
                                </Route> */}
                            {/* <Route path="/exchange">
                                        <ExchangePage />
                                    </Route> */}
                            <Route path="/transactionstatus">
                                <StatusPage />
                            </Route>
                            {/* <Route path="/settings">
                                        <SettingsPage />
                                    </Route> */}
                            <Route path="/error">
                                <ErrorPage />
                            </Route>
                            {/* <Route path="/landing">
                                <LandingPage />
                            </Route> */}
                        </Switch>
                        <Footer />
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
