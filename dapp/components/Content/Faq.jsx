import React from "react";

import { Accordion } from "react-bootstrap";

import { FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Faq() {
  const faqs = [
    {
      title: "What is the total supply?",
      description: "A total of 7,777 unique Doodorie NFTs will be generated.",
    },
    {
      title: "How much will a Doodorie cost to mint?",
      description: "The Doodorie mint price is 0.042 ETH",
    },
    {
      title: "When is mint?",
      description: "The public sale will be on January 24.",
    },
    {
      title: "Is there a Pre-Sale?",
      description:
        "Yes, there will be a Pre-sale on January 23. A full 24 hours before the public sale.",
    },
    {
      title: "What do I get with my Doodorie?",
      description:
        "In addition the your PFP NFT, you get a claim to a 3D Voxel version of your Doodorie. Plus, you get exclusive access to Merch, Airdrops, and future projects from the team.",
    },
    {
      title: "What rights do I have with my Doodorie?",
      description:
        "You receive 100% IP rights over your Doodorie. You are free to do anything you want with it.",
    },
  ];

  const team = [
    {
      name: "Minto",
      title: "Creative Director",
      image: "/team1.png",
      twitter: "https://twitter.com/mahdqureshi?s=21",
      discord: null,
      linkedIn: null,
    },
    {
      name: "Ocean",
      title: "Product Manager",
      image: "/team2.png",
      twitter: "https://twitter.com/oceanqureshi?s=21",
      discord: null,
      linkedIn: null,
    },

    {
      name: "Kook",
      title: "Community Manager",
      image: "/team3.png",
      twitter: "https://twitter.com/t_cardosi?s=21",
      discord: null,
      linkedIn: null,
    },

    {
      name: "Angelo",
      title: "Developer",
      image: "/team4.png",
      twitter: null,
      discord: null,
      linkedIn: "https://www.linkedin.com/in/dilukangelo/",
    },
  ];
  return (
    <>
      <div className="faq">
        <h1 className="aboutus-title maintitle">FAQ</h1>
        <div className="container faq-container">
          <Accordion defaultActiveKey="0">
            {faqs.map((item, i) => {
              return (
                <Accordion.Item eventKey={i} key={i}>
                  <Accordion.Header>{item.title}</Accordion.Header>
                  <Accordion.Body>{item.description}</Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>

      <div className="team">
        <h1 className="aboutus-title maintitle">Team</h1>
        <div className="container">
          <div className="row">
            {team.map((person, i) => {
              return (
                <div className="col-6 col-md-3 teammember" key={i}>
                  <img src={person.image} alt={person.name} />
                  <h1>{person.name}</h1>
                  <h2>{person.title}</h2>
                  <div className="icons">
                    {person.twitter && (
                      <a href={person.twitter} target="_blank" rel="noreferrer">
                        <FaTwitter />
                      </a>
                    )}

                    {person.linkedIn && (
                      <a
                        href={person.linkedIn}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedinIn />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
