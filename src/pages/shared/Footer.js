import React from 'react';
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';


//////////////////////////// Footer component
const Footer = () => {
    return (
        <div className="footer-part">
            <div style={{ padding: '1rem 2rem 1rem 2rem' }} className="footer-body">
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
                    <div>
                        <FacebookIcon />
                        <InstagramIcon />
                        <TwitterIcon />
                    </div>
                </div>
                <div>
                    <h2>Pament methods</h2>
                    <img style={{ borderRadius: "40px", width: "50%" }} src="https://www.zooinfotech.com/wp-content/uploads/2021/04/44-440249_paypal-payment-methods-icons-hd-png-download.jpg" alt="payment methods" />
                </div>
            </div>
            <h3 className="copy-right">Copyright © Khoundokar Sami un nobi Samid</h3>
        </div>

    );
};

export default Footer;