import "@ethersproject/shims";
import { BigNumber } from "ethers";
import { getContractObj } from "./contract";
import axios from 'axios';



export async function mint(_mintAmount, provider, account) {
 
  const myContract  = getContractObj(provider);

  try {
    var cost;
    const c = await myContract.cost();
    cost = BigNumber.from(c);

    var tx = await myContract.mint(_mintAmount, {
      value: cost.mul(_mintAmount),
    });
    return tx;
  } catch (error) {
    console.log(error);
    
    return false;
  }
}


export async function wl(_mintAmount, provider, account) {
 
  const myContract  = getContractObj(provider);

  try {
   

    var tx = await myContract.wl();
    return tx;
  } catch (error) {
    console.log(error);
    
    return false;
  }
}


export async function paused(_mintAmount, provider, account) {
 
  const myContract  = getContractObj(provider);

  try {
   

    var tx = await myContract.saleOn();
    return tx;
  } catch (error) {
    console.log(error);
    
    return false;
  }
}


export async function cost(_mintAmount, provider, account) {
 
  const myContract  = getContractObj(provider);

  try {
   

    var tx = await myContract.cost();
    return tx;
  } catch (error) {
    console.log(error);
    
    return false;
  }
}












export async function getAllInfo(provider) {
  
  const mycontract = getContractObj(provider);
  const t = await mycontract.totalSupply();
  console.log()
  console.log(t)
  try {
    const [
      totalSupply,
      maxSupply,
      cost,
      maxMintAmountPerTransaction,
      wl,
      saleOn
    ] = await Promise.all([
      mycontract.totalSupply(),
      mycontract.maxSupply(),
      mycontract.cost(),
     
      mycontract.maxMintAmountPerTransaction(),
     
      mycontract.wl(),
      mycontract.saleOn(),
    ]);

     
    return {
      totalSupply,
      maxSupply,
      cost,
    
      maxMintAmountPerTransaction,
      wl,
      saleOn
    };
  } catch (error) {
    console.log(error);
  }
}
