import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React from 'react';
import DisplayReview from './DisplayReview';
import LimitedProducts from './LimitedProducts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Banner from './banner/Banner';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LimitedProducts></LimitedProducts>
            <div style={{width:"60%", margin:"auto"}}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>How mane product do I have to buy atleast ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Considering all kinds of buyer we do retail sale and buyer can buy single product.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>How much the delivery cost?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We provide our service to the whole country and you will be surprised to here that we only charge 1$ for delivery where ever you ar in the country.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>What about Replacement policy ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We provide the best service in our country. You can replace the product within 30 days with cash-memo.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>What is the payment method?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Because of our developer who doesn't know the payment method gateway we only offer Cash on delivery system. 
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div><br /><br /><br />
            <DisplayReview></DisplayReview>
        </div>
    );
};

export default Home;