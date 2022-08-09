import * as nearAPI from "near-api-js";


const { keyStores } = nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

const { connect } = nearAPI;

const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore, // first create a key store 
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

// connect to NEAR
const nearConnection = await connect(connectionConfig);

// create wallet connection
const walletConnection = new WalletConnection(nearConnection);  

//request signin for user
walletConnection.requestSignIn({
    contractId: "dev-1659704680899-56318775491014",
    methodNames: [], // optional
    successUrl: "http://localhost:3000/defi/baskets/near/0", // optional redirect URL on success
    failureUrl: "http://localhost:3000/defi/baskets" // optional redirect URL on failure
});

// check if user isSignedIn
const [isSignedIn, setIsSignedIn] = useState(walletConnection.isSignedIn());

//get wallet Id 
const [walletAccountId, setWalletAccountId] = useState(walletConnection.getAccountId());

//get wallet Obj 
const walletAccountObj = walletConnection.account();

