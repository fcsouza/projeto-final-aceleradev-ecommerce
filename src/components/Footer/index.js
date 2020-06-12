import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      Contato
      <>
        <div className="footer__icons">
          <FiInstagram className="icon icon--insta" />
          <FiFacebook className="icon icon--face" />
          <FiTwitter className="icon icon--twitter" />
          <FiMail className="icon icon--mail" />
        </div>
      </>
    </div>
  );
}
