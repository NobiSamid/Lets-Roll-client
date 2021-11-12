import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-part">
            <div className="footer-body">
                <div className="footer-item">
                    <h1>Let's Roll</h1>
                    <h3> 293/B, Shohag smriti road, Kazihata, Rajpara, Rajshahi</h3>
                    <h3>nobisamid@gmail.com</h3>
                    <h3>09876543210</h3>
                </div>
                <div className="footer-item">
                    <h3>About us</h3>
                    <h3>Contact us</h3>
                    <h3>Refund policy</h3>
                    <h3>Terms and conditions</h3>
                    <h3>Privacy Policy</h3>
                    <div>Icons</div>
                </div>
                <div><h2>Pament methods</h2></div>
            </div>
            <h3 className="copy-right">Copyright © Khoundokar Sami un nobi Samid</h3>
        </div>

    );
};

export default Footer;