import { Contract } from "@ethersproject/contracts";
import { abi, contractAddress } from "./contractInfo";
import {ethers} from 'ethers';

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return `${startStr}...${endStr}`;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return `${startStr}...${endStr}`;
}

export function getContractObj(provider) {

  return new Contract(contractAddress, abi,  provider);
}

export function getContractObjWithAddress(_contractAddress, _abi, _provider) {
  
  return new Contract(_contractAddress, _abi, _provider);
}

export const shorter = (str) =>
  str?.length > 8 ? `${str.slice(0, 6)}...${str.slice(-4)}` : str;
