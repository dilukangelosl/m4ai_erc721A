import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

const metaMask = new InjectedConnector({
  supportedChainIds: [5],
});

const walletConnect = new WalletConnectConnector({
  rpc: { 1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"},
  infuraId: "643496a037da4567877f0ba9db505b57",
  bridge: "https://bridge.walletconnect.org/",
  qrcode: true,
  pollingInterval: 15000,
  supportedChainIds: [5],
});


 const walletlink = new WalletLinkConnector({
  url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  appName: 'M4AI',
  supportedChainIds: [5]
})
export { metaMask, walletConnect,walletlink };
