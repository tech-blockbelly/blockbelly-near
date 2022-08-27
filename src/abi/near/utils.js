import { connect, Contract, WalletConnection, utils, providers } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'testnet')

// Initialize contract & set global variables
export async function initContract() {
  // Set a connection to the NEAR network
  window.near = await connect(nearConfig)

  // Initialize a Wallet Object
  window.walletConnection = new WalletConnection(window.near)

  // Initialize a Contract Object (to interact with the contract)
  window.contract = await new Contract(
    window.walletConnection.account(), // user's account
    nearConfig.contractName, // contract's account
    {
      viewMethods: ['ft_metadata', 'ft_total_supply', 'ft_balance_of', 'ft_token_allocation', 'min_investment'],
      changeMethods: ['ft_mint', 'ft_burn', 'sell_token', 'buy_token', 'update_token_allocation', 'update_input_token', 'update_base_price', 'bof' ],
    }
  )
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allows to make calls to the contract on the user's behalf.
  // Works by creating a new access key for the user's account
  // and storing the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
  window.walletConnection.requestSignIn({
    contractId: 'ref-finance-101.testnet',
    methodNames: [
    'get_pools',
    'get_pool_total_shares',
    'get_deposits',
    ],
  });
}


export async function fetchMetadata() {
  let response = await window.contract.ft_metadata()
  return response;
}

export async function fetchMinInvestment() {
  let response = await window.contract.min_investment()
  return response;
}

export async function fetchTotalSupply() {
  let response = await window.contract.ft_total_supply()
  return response;
}

export async function fetchTokenAllocation() {
  let response = await window.contract.ft_token_allocation()
  return response;
}

export async function fetchAccountBalance(account) {
  let response = await window.contract.ft_balance_of({"account_id": account})
  return response;
}

export async function updateBaseprice() {
  console.log('Updating base price');
  let response = await window.contract.update_base_price({"base_price":"500000000000000000"})
  return response;
}

// export async function buyToken(amount, tokenList, tokenDeposit) {
export async function buyToken(distribution, bbContract) {
  let tokenInfo = {
    "amount":distribution.amountIn.toString(),
    "token_list":distribution.split.map(token => token.tokenOut),
    "token_deposits":distribution.split.map(token => token.amtInDist.toString()),
  }
  let gas = 300000000000000;
  console.log('Calling buy_token', tokenInfo);
  let response = await bbContract.buy_token(tokenInfo, gas);

  return response;
}

export async function burnToken() {
  console.log('Calling sell_token');
  let tokenInfo = {
    "index_token":"1"
  }
  
  let gas = 300000000000000;
  let response = await window.contract.sell_token(tokenInfo, gas);

  return response;
}

export async function callBof() {
  console.log('Calling callBof');
  let tokenInfo = {
    "tokens":"10000"
  }

  let response = await window.contract.bof(tokenInfo);
  return response;
}


//FT transfer function and new contract obj to communicate with ref.fakes.testnet
export async function initRefContract() {
  // Initialize a Wallet Object
  window.walletConnection = (window.walletConnection) ? window.walletConnection : new WalletConnection(window.near) ;

  // Initialize a Contract Object (to interact with the contract)
  window.refcontract = await new Contract(
    window.walletConnection.account(), // user's account
    "ref.fakes.testnet", // contract's account
    {
      viewMethods: ['ft_metadata'],
      changeMethods: ["ft_transfer"],
    }
  )
}

export async function callftTransfer() {
  console.log('Calling ft_transfer');
  let info = {
    "receiver_id": window.contract.contractId,
    "amount":"999999999999940000",
  };
  let amt = 1;
  let gas = 300000000000000;

  let response = await window.refcontract.ft_transfer(info, amt, gas);

  return response;
}

export async function fetchRefConMetadata() {
  let response = await window.refcontract.ft_metadata()
  return response;
}

/* export async function callftTransfer() {
  console.log('Calling ft_transfer');
  let info = {
    "receiver_id": window.contract.contractId,
    "amount":"999999999999940000",
    "msg":"Ft transfer function called from BB frontend" 
  };
  let amt = 1;
  let gas = 300000000000000000;

  let response = await window.refcontract.ft_transfer_call(info, amt, gas);
  return response;
} */