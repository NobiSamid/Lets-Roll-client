import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Notfound.css';


const Notfound = () => {
    return (
        <div className="bg">
            <div>
                <h1 className="fourOfour">404</h1>
            </div>
            <div className='float'>
                <h1 className="page">Page not found</h1>
                <Link to="/">
                    <Button variant="contained">
                        <a href="/" className="btntxt">Go to home page</a>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Notfound;