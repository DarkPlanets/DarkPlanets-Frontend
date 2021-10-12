import { isValidElement, cloneElement } from "react";
import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";

const CHAIN_IDS = {
  FANTOM_MAINNET: 250,
  FANTOM_TESTNET: 0xfa2,
};

export const RARITY_CONTRACT = {
  [CHAIN_IDS.FANTOM_MAINNET]: "0xce761d788df608bd21bdd59d6f4b54b2e27f25bb",
  [CHAIN_IDS.FANTOM_TESTNET]: "0xc6AA51A57582d29e742513Cb14b395bDC2028BaC",
};

export const DARK_PLANET_CONTRACT = {
  [CHAIN_IDS.FANTOM_MAINNET]: "0xF43523e83E1E526C4B1a65250f4d5Ebacf60f815",
};

export const RARITY_LAND_CONTRACT = {
  [CHAIN_IDS.FANTOM_MAINNET]: "0x5Ef44Dc59D4aBec3A0cCf7F5eEBaF53F9808D328",
  [CHAIN_IDS.FANTOM_TESTNET]: "0xc71aa720B3b0D8AB5b295F57D269c9e962679EF5",
};

export const RARITY_LAND_STORAGE_CONTRACT = {
  [CHAIN_IDS.FANTOM_MAINNET]: "0x411409fF5c149499062AB86E158aB2945eF366e3",
  [CHAIN_IDS.FANTOM_TESTNET]: "0xfdc0c21468134a64D7A0CA3364D8A82F215c578f",
};

export const TICKET_CONTRACT = {
  [CHAIN_IDS.FANTOM_MAINNET]: "0xC411Db07b94599B18f4db7F3acE9901531f26A62",
};

export const isAddress = (value) => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
};

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export const getContract = (address, ABI, library, account) => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
};

export const base64ToJson = (base64Str) =>
  JSON.parse(
    window.atob(
      decodeURIComponent(base64Str).replace("data:application/json;base64,", "")
    )
  );

export const saveImage = (base64Str) => {
  var a = document.createElement("a");
  a.href = base64Str;
  a.download = "darkplanet.svg";
  a.click();
};

export const addPropsToReactElement = (element, props) => {
  if (isValidElement(element)) return cloneElement(element, props);

  return element;
};

export const addPropsToChildren = (children, props) => {
  if (!Array.isArray(children)) return addPropsToReactElement(children, props);

  return children.map((childElement) =>
    addPropsToReactElement(childElement, props)
  );
};

export const randomGen = (min = 1, max = 12) => {
  let num = Math.random() * (max - min) + min;

  return Math.floor(num);
};
