import React from "react";

export default function Content() {
  return (
    <>
      <div className="container contentsection">
        <div className="row">
          <div className="col-md-5">
            <img src="/contentimage.png" alt="content" className="aboutimage" />
          </div>

          <div className="col-md-7 colcenter">
            <h1 className="aboutus-title maintitle left-title">
              About Doodories
            </h1>
            <p className="aboutus">
              The Doodories are the offspring of Doodles and CryptoMories that
              fell in love after a portal connected the two universes. There are
              a total of 7,777 of them. Each with his or her own unique blend of
              their parents. Also some cats came to hang out.<br></br>
              <br></br>
            </p>
          </div>
        </div>
      </div>
      <img src="Morie.png" alt="morie" className="morie" />
      <div className="clearfix"></div>
    </>
  );
}
