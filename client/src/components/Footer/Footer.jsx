import React from "react";
import classes from "./footer.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import evangadiLogo from "../../assets/images/footlogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className={classes.footer_container}>
      <div>
        <Link to="/">
          <img
            className={classes.eva_logo}
            src={evangadiLogo}
            alt="Evangadi Logo"
          />
        </Link>
        <div className={classes.footer_links}>
          <a
            href="https://www.facebook.com/evangaditech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/evangaditech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.youtube.com/@EvangadiTech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>

      <div className={classes.useful_links}>
        <h1>Useful Links</h1>
        <ul>
          <li>
            <Link to="/how-it-works">How it works</Link>
          </li>
          <li>
            <a
              href="https://www.evangadi.com/legal/terms/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of service
            </a>
          </li>
          <li>
            <a
              href="https://www.evangadi.com/legal/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>

      <div className={classes.contact_info}>
        <h1>Contact Info</h1>
        <ul>
          <li>Evangadi Networks</li>
          <li>support@evangadi.com</li>
          <li>+1-202-386-2702</li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
