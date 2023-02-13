import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Modal } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import { mint, getAllInfo, mintWhitelist } from "../../lib/contractMethods";
import toast from "react-hot-toast";
import axios from "axios";
import ConnectModal from "../Connect/ConnectModal";
import Web3 from 'web3';
import Countdown from "react-countdown";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";



export default function Hero() {
  const { account, active, library } = useWeb3React();
  const [qty, setqty] = useState(1);
  const [isOg, setIsOg] = useState(false);
  const [proof, setProof] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whitelistDataLoading, setWhitelisDataLoading] = useState(true);
  const [isSale,setIsSale] = useState(false);


  const [wl, setWl] = useState(true);
  const [saleOn, setSaleOn] = useState(false);
  const [cost, setCost] = useState(false);

  const [show, setShow] = useState({
    show: false,
    title: "",
    link: "",
    progress: false,
    dismiss: false,
    buttonText: "",
  });



  const [info, setInfo] = useState({
    totalSupply:0,
    maxSupply:500,
    cost:0,
    maxMintAmountPerTransaction:1,
    
   

  });

  useEffect(() => {
    if (active) {  
      setTimeout(() => {
        getEngine();
      }, 500);
    }
  }, [active]);

  const handleClose = () => setShow(false);

  async function getEngine() {
    try {
      toast("Loading contract...");
    setLoading(true);
    const data = await getAllInfo(library?.getSigner());
    console.log("Contract info data", data);
    setInfo(data);
    setWhitelisDataLoading(false)
    setLoading(false);
    toast("Contract loaded, Happy minting!");
    } catch (error) {
      console.log(error)
    }
  }



  const renderer = (redndererData) => {
    if (redndererData.completed) {
      // Render a completed state
     setIsSale(true);
     return (<></>)
    } else {
      // Render a countdown
      return (
        <div className="countcontainer">
          <h1 className="countdowntitle">Countdown to Pre Sale</h1>
          <div className="countdowncomponent">
            {/* <div className="timecontainer">
              <div className="timerholder">{redndererData.days}</div>
              <span className="daytitle">Days</span>
              
            </div> */}

            <div className="timecontainer">
              <div className="timerholder">{redndererData.hours}</div>
              <span className="daytitle">Hours</span>
              
            </div>

            <div className="timecontainer">
              <div className="timerholder">{redndererData.minutes}</div>
              <span className="daytitle">Minutes</span>
            
            </div>

            <div className="timecontainer">
              <div className="timerholder">{redndererData.seconds}</div>
              <span className="daytitle">Seconds</span>
             
            </div>
          </div>
        </div>
      );
    }
  };

 

 

  

  async function increment() {

    if (qty < 20) {
      setqty(qty + 1);
    }
  
  }

  function decrease() {
    if (qty > 1) {
      setqty(qty - 1);
    }
  }
  const btntext = () => {
    return account ? `Mint` : "Connect Wallet";
  };

  function showMintModal(state, title, link, progress, dismiss, buttonText) {
    setShow({
      show: state,
      title,
      link,
      progress,
      dismiss,
      buttonText,
    });
  }

  function saleStatus() {
    if (active) {
      if (false) {
        return "Sale is not Active";
      } else {
        if (info.whiteListingSale) {
           if(proof.length > 0){
            if(isOg){
              return `OG Whitelisted : 0.04 ETH`;
            }else {
              return `Whitelisted : 0.05 ETH`;
            }
           }else{
             return "Sorry you are not whitelisted";
           }
        } else {
          return "SOLD OUT";
        }
      }
    } else {
      return "SOLD OUT";
    }
  }

  function showWhitelistingData(){
    return (
      <div>
        <h3 className="wlloadingtext">Checking wallet..</h3>
          <div className="spinner-border" role="status">
  <span className="sr-only"></span>
</div>
      </div>
    )
  }
  function showMintButtons() {
    if (true) {
      return (
       
        <div className="btncontainer">
         
          <div className="qtycontrols">
            <button className="btn btn-clear" onClick={decrease}>
              -
            </button>
            <span className="mintqty">{qty}</span>
            <button className="btn btn-clear bluebtn" onClick={increment}>
              +
            </button>
          </div>

          <button
            className="herobtn2"
            disabled={true}
            onClick={async () => {
              try {
               
                if(!account){
                  return;
                }

                if (!info?.saleOn) {
                  return toast.error("Sale is not Active yet");
                } 

                toast("Please wait..", {
                  icon: "👏",
                });
                var tx;
            
                  tx = await mint(qty, library?.getSigner(), account);
               
                showMintModal(
                  true,
                  "Mint submitted",
                  `https://etherscan.io/tx/${tx.hash}`,
                  true,
                  false,
                  ""
                );
                await tx.wait(1);
                showMintModal(
                  true,
                  "Mint Success",
                  `https://etherscan.io/tx/${tx.hash}`,
                  false,
                  true,
                  "Done"
                );
              
              } catch (error) {
                console.log(typeof error);
                console.log("Error", error.toString());
                if (error.toString().includes("execution reverted")) {
                  toast.error("Please contact Admins");
                } else {
                  toast.error("Insufficient funds or Transaction Error");
                }

                showMintModal(false, "", "", false, true, "Close");
              }
            }}
            disabled={!account && !loading}
          >
            {btntext()}
          </button>

          <CrossmintPayButton className="crossmint"
                clientId="4c4e8528-d568-4cd3-bd0f-61ce64ca3f59"
                mintConfig={{"type":"erc-721","totalPrice":Web3.utils.fromWei((qty*info?.cost).toString(), "ether"),"_mintAmount":qty}}
                
            />
        </div>
      );
    } else {
      return (
        <a
          className="herobtn2"
          href="https://opensea.io/collection/doodories-official"
        >
          Opensea
        </a>
      );
    }
  }

  function mintTitle (){
   
     if(!loading){
    
        return `${info?.wl?"WHITELISTING SALE: ":"PUBLIC SALE: "}MINT PRICE : ${parseFloat(Web3.utils.fromWei(info?.cost.toString()))}ETH`
      
     }
  }


  
  const cdate = Date.UTC(2021, 1, 5, 4);
  return (
    <>
      <div className="mintmodalcontainer">
        <Modal show={show.show} onHide={handleClose} className="mymodal">
          <Modal.Body>
            <div className="mintmodal">
              <img
                src="/success.png"
                className="mintmodalimage"
                alt="Mintmodalimage"
              />

             

              <h2>{show.title}</h2>
              <h3>
                See the transaction on{" "}
                <a href={show.link} target="_blank" rel="noreferrer">
                  Etherscan
                </a>
              </h3>
              {show.progress && (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only"></span>
                </div>
              )}
              <h3>{show.body}</h3>

              {show.dismiss && (
                <button
                  className="btn herobtn"
                  onClick={handleClose}
                >
                  {show.buttonText}
                </button>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <div className="hero">
        <Container>
              <div className="mintformgradient">
              <div className="mintform">
              
                     <img src="/banner.gif" alt="" className="mintlogo"/> 
                   {!isSale &&  <Countdown date={cdate} renderer={renderer} />}
                  
                   {isSale && !active &&  <ConnectModal />}
                    {isSale && active && <>
                    <h1 className="minttitle">{mintTitle()}</h1>
                    {/* <p className="mintdes">{mintDescription()} </p> */}
                   
                  
                    {active &&  <div className="supply">
                        {info.totalSupply.toString()}/500
                      </div>}
                    { active   && showMintButtons()} 
                    </>}
              </div>
              </div>
        
        </Container>
        
      </div>
    </>
  );
}
