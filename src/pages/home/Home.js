import React from 'react';
import Banner from './Banner';
import DisplayReview from './DisplayReview';
import LimitedProducts from './LimitedProducts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <h3>This is home</h3>
            <LimitedProducts></LimitedProducts>
            <DisplayReview></DisplayReview>
        </div>
    );
};

export default Home;