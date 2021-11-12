import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Product from './Product';
import CircularProgress from '@mui/material/CircularProgress';


const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // fetch('http://localhost:5000/products')
        fetch('https://aqueous-mountain-11815.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    console.log(products);
    return (
        <div>
           { products.length === 0 ? <CircularProgress style={{marginTop:"100px", marginBottom:"100px"}} /> : <Grid container sx={{ my: 5, mr: 5 }} spacing={1}>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </Grid>}
        </div>
    );
};

export default Products;