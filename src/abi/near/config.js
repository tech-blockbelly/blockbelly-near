import { keyStores } from 'near-api-js'

const CONTRACT_NAME = process.env.CONTRACT_NAME ||'dev-1659704680899-56318775491014'
// const CONTRACT_NAME = process.env.CONTRACT_NAME ||'dev-1660732027225-80822638182175'

function getConfig(env) {
  switch (env) {

  case 'production':
  case 'mainnet':
    return {
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org',
      contractName: CONTRACT_NAME,
      walletUrl: 'https://wallet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      explorerUrl: 'https://explorer.mainnet.near.org',
      deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() }
    }
  case 'development':
  case 'testnet':
    return {
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      contractName: CONTRACT_NAME,
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
      deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() }
    }
  default:
    throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
  }
}

export default getConfig;