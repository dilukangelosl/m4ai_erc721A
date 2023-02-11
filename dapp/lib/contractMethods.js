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















export async function getAllInfo(provider) {
  const mycontract = getContractObj(provider);
  console.log("provider",provider);
  try {
    const [
      totalSupply,
      maxSupply,
      cost,
      maxMintAmountPerTransaction,
      paused,
     

     
      
    ] = await Promise.all([
      mycontract.totalSupply(),
      mycontract.maxSupply(),
      mycontract.cost(),
     
      mycontract.maxMintAmountPerTransaction(),
      mycontract.paused(),
     
    ]);

    return {
      totalSupply,
      maxSupply,
      cost,
    
      maxMintAmountPerTransaction,
      paused,
     
     
    };
  } catch (error) {
    console.log(error);
  }
}
