import React from "react";

export default function Roadmap() {
  const roadmapdetails = [
    {
      image: "/roadmap1.png",
      title: "PFP Collection",
      description:
        "Release a 7,777 PFP collection on January 23rd. Each as a ERC-721 token on the Ethereum Blockchain.",
    },
    {
      image: "/roadmap2.png",
      title: "Air drops & Collectables",
      description:
        "Exclusive air drops and merch available for Doodorie, CryptoMorie, and Doodle holders.",
    },
    {
      image: "/roadmap3.png",
      title: "3D Voxels",
      description:
        "Each Doodorie you hold will allow you to claim a 3D Voxel Doodorie. A space in a Metaverse world will be made for Doodorie, CryptoMorie, and Doodle holders.",
    },
    {
      image: "/roadmap4.png",
      title: "Future Projects",
      description:
        "Each Doodorie holder will have exclusive access to any futures projects from the team.",
    },
  ];

  return (
    <>
      <div className="roadmap">
        <h1 className="aboutus-title maintitle" style={{ color: "#4200FF" }}>
          Roadmap
        </h1>
        <div className="container roadmap-container">
          {roadmapdetails.map((item, index) => {
            return (
              <div className="roadmapitem" key={index}>
                <img
                  src={item.image}
                  className="roadmap img"
                  alt="roadmap item"
                />
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
