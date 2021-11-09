import React from 'react';
import Products from '../products/Products';
import Banner from './Banner';
import Review from './Review';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <h3>This is home</h3>
            <Review></Review>
        </div>
    );
};

export default Home;