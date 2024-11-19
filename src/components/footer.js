import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";


const Footer = () => {
    const logo = process.env.PUBLIC_URL + '/img/perfume-logo (1).png';
    return (
        <footer>
            <div className="footer">
                <div className="footer-description">
                    <p className="logo">World of Fragrance</p>
                    <p className="footer-txt">
                        Our Fragrance Wheel helps reveal the <br />
                        connection between your natural fragrance<br />
                        preferences and various fragrance families.<br />
                        Discover the scents that perfectly match your<br /> 
                        style and personality.
                    </p>
                </div>
                
                <img className="logo" src={logo} alt="Brand Logo" />
                <div className="footer-icons">
                    <FaFacebookF className="icons" />
                    <FaInstagram className="icons" />
                    <FaLinkedinIn className="icons" />
                    <FaTwitter className="icons" />
                </div>
            </div>
            <hr className="footer-hr" />
            <p className="txt-p">2020 IoT © Copyright all rights reserved, bla bla</p>
        </footer>
    );
}

export default Footer;
