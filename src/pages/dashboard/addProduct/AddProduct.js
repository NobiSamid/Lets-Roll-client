import { Alert, Button, Container, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const AddProduct = () => {
    const { user } = useAuth();

    const [productData, setProductData] = useState({});
    const [success, setSuccess] = useState(false);

    const handleOnBlurP = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newProductData = { ...productData };
        newProductData[field] = value;
        setProductData(newProductData);
        console.log(productData);
    }
    const handleProductSubmit = e => {
        // fetch('http://localhost:5000/products',{
        fetch('https://aqueous-mountain-11815.herokuapp.com/products',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(productData)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.acknowledged === true){
                console.log("operation success");
                setSuccess(true)
            }
        })
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{my:"auto"}} item sm={12} md={6}>
                    <Typography sx={{fontSize:"2rem", fontWeight:"600"}}>{user?.displayName}</Typography>
                    <Divider />
                    <Typography sx={{fontSize:"2rem", fontWeight:"500"}}>Add new product to the shop</Typography>
                    <Typography sx={{fontSize:"1rem", fontWeight:"500"}}>Please make sure you've inserted correct data of product and valid image url</Typography>
                </Grid>
                <Grid item sm={12} md={6}>
                    <form onSubmit={handleProductSubmit}>
                        <TextField
                            id="standard-basic"
                            label="Product name"
                            type="text"
                            name="title"
                            variant="standard"
                            sx={{ width: "75%", m: 2 }}
                            onBlur={handleOnBlurP}
                        /><br />
                        <TextField
                            id="standard-textarea"
                            label="Description"
                            type="text"
                            multiline
                            name="info"
                            variant="standard"
                            sx={{ width: "75%", m: 2 }}
                            onBlur={handleOnBlurP}
                        /><br />
                        <TextField
                            id="standard-basic"
                            label="Price"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            type="number"
                            name="price"
                            variant="standard"
                            sx={{ width: "75%", m: 2 }}
                            onBlur={handleOnBlurP}
                        /><br />
                        <TextField
                            id="standard-basic"
                            multiline
                            label="Image url"
                            type="text"
                            name="photo"
                            variant="standard"
                            sx={{ width: "75%", m: 2 }}
                            onBlur={handleOnBlurP}
                        /><br />
                        <Button sx={{ width: 150, m: 2 }} type="submit" variant="contained">Add to Shop</Button>
                    </form>
                    {success && <Alert severity="success">Added the product successfully</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddProduct;