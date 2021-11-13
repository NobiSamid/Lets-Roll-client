import React from 'react';
import './Banner.css';

///////////////////////// Top banner
const Banner = () => {
    return (
        <section>
            <div className="content">
                <h2>Grab your desired Skateboard and Let's Roll</h2>
                <p>Get the best Skateboard from us. We have various collection of skateboard. Over 100 brands connected with us. We also provide awesome sticker for your loved board to look more cool. So, what are you waiting for ? lets grab your board and get ready to roll</p>
            </div>
            <img src="https://image.freepik.com/free-vector/cool-astronaut-playing-skateboard-cartoon-vector-icon-illustration-science-sport-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3406.jpg" alt="banner" />
            <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,224L34.3,234.7C68.6,245,137,267,206,245.3C274.3,224,343,160,411,149.3C480,139,549,181,617,202.7C685.7,224,754,224,823,218.7C891.4,213,960,203,1029,213.3C1097.1,224,1166,256,1234,250.7C1302.9,245,1371,203,1406,181.3L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
        </section>
        
    );
};

export default Banner;