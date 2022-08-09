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
      changeMethods: ['ft_mint', 'ft_burn', 'sell_token', 'buy_token', 'update_token_allocation', 'update_input_token' ],
    }
  )
}

export async function fetchMetadata() {
  let response = await window.contract.ft_metadata()
  return response;
}


export async function fetchMinInvestment() {
  let response = await window.contract.min_investment()
  return response;
}

// export async function buyToken(amount, tokenList, tokenDeposit) {
export async function buyToken() {
  console.log('Calling buy_token');
  let tokenInfo = {
    "amount":"500000000000000000",
    "token_list":[
      "hapi.fakes.testnet",
      "wrap.testnet",
      "usdc.fakes.testnet",
      "usdt.fakes.testnet",
      "paras.fakes.testnet"
    ],
    "token_deposits":[
      "100000000000000000",
      "100000000000000000",
      "100000000000000000",
      "100000000000000000",
      "100000000000000000"
    ]
  }
  let gas = 300000000000000;
  let response = await window.contract.buy_token(tokenInfo, gas);

  return response;
}