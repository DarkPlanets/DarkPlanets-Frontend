import { NetworkConnector } from "@web3-react/network-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

const RPC_URLS = {
  250: process.env.RPC_URL_250,
  0xfa2: process.env.RPC_URL_TESTNET,
};

export const injected = new InjectedConnector({
  supportedChainIds: [250, 0xfa2],
});

export const network = new NetworkConnector({
  urls: { 250: RPC_URLS[250], 0xfa2: RPC_URLS[0xfa2] },
  defaultChainId: 250,
});
