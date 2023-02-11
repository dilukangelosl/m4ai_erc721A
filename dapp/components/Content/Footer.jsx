import React from "react";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <div className="socialicons">
        <a href="https://twitter.com/doodories">
          <FaTwitter />
        </a>
      </div>
      <p>
        Doodories is made with love by proud CryptoMorie owners. It is not
        affiliated with any other projects.
      </p>
    </div>
  );
}
