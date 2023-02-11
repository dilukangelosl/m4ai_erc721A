import React from "react";

export default function Traits() {
  return (
    <div className="bleachbg">
      <div className="container contentsection">
        <h1 className="aboutus-title maintitle">Types</h1>
        <div className="row">
          <div className="col-6 col-md-3">
            <div className="typecontainer">
              <img src="/types1.png" alt="content" className="contentimage" />
              <h1 className="typetitle">Skull</h1>
              <h2 className="typesub">Common</h2>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="typecontainer">
              <img src="/types3.png" alt="content" className="contentimage" />
              <h1 className="typetitle">Cyborg</h1>
              <h2 className="typesub" style={{ color: "#605EF2" }}>
                Less Common
              </h2>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="typecontainer">
              <img src="/types4.png" alt="content" className="contentimage" />
              <h1 className="typetitle">Open Skull</h1>
              <h2 className="typesub" style={{ color: "#E751D8" }}>
                Rare
              </h2>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="typecontainer">
              <img src="/types2.png" alt="content" className="contentimage" />
              <h1 className="typetitle">Cat</h1>
              <h2 className="typesub" style={{ color: "#B89915" }}>
                Ultra Rare
              </h2>
            </div>
          </div>
        </div>

        <h1 className="moreinfo">Plus more “Insanely Rare” types..</h1>
      </div>
    </div>
  );
}
