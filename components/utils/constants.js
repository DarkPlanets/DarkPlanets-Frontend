import { isValidElement, cloneElement } from "react";
import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";

const CHAIN_IDS = {
  FANTOM_MAINNET: 250,
};

export const RARITY_CONTRACT = {
  [CHAIN_IDS.FANTOM_MAINNET]: "0xce761d788df608bd21bdd59d6f4b54b2e27f25bb",
};

export const DARK_PLANET_CONTRACT = {
  [CHAIN_IDS.FANTOM_MAINNET]: "0xF43523e83E1E526C4B1a65250f4d5Ebacf60f815",
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
