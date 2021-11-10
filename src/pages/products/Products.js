import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[]);
    console.log(products);
    return (
        <Grid container sx={{my:5, mr:5}} spacing={1}>
            {
                products.map(product =><Product
                key={product._id}
                product={product}
                ></Product>)
            }
        </Grid>
    );
};

export default Products;