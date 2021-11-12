import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const PlaceOrder = () => {
    const { user } = useAuth();
    const { pkey } = useParams();

    const [order, setOrder] = useState({});
    const [success, setSuccess] = useState(false);
    const product = order.title;
    const price = order.price;
    // console.log(product, price);

    useEffect(() => {
        // fetch(`http://localhost:5000/products/${pkey}`)
        fetch(`https://aqueous-mountain-11815.herokuapp.com/products/${pkey}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])

    const initialInfoOrder = {quantity:1}
    const [placeOrder, setPlaceOrder] = useState(initialInfoOrder);
    // console.log(placeOrder);

    // console.log(initialInfoOrder);

    const handleOnBlurO = e =>{
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newOrder = {
            ...placeOrder,
            user:user.displayName,
            email:user.email,
            product:product,
            price:price,
        };
        newOrder[field] = value;
        setPlaceOrder(newOrder);
        // console.log(newOrder);
    }

    const handleOrderSubmit = e =>{


        // fetch('http://localhost:5000/orders', {
        fetch('https://aqueous-mountain-11815.herokuapp.com/orders', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(placeOrder)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.acknowledged === true){
                console.log("operation success");
                setSuccess(true)
            }
        })
        console.log(placeOrder);
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2} >
                <Grid item sm={12} md={6} >
                    <Typography>{user?.displayName}</Typography>
                    <Typography>{user?.email}</Typography>
                    <Typography>{order.title}</Typography>
                    <Typography>Please go through every field to get all input</Typography>
                </Grid>
                <Grid item sm={12} md={6} >
                <form onSubmit={handleOrderSubmit}>
                    <TextField
                        id="standard-basic"
                        label="Address"
                        type="text"
                        name="address"
                        variant="standard"
                        sx={{ width: "75%", m: 2 }}
                        onBlur={handleOnBlurO}
                    /><br />
                    <TextField
                        id="standard-basic"
                        label="Phone Number"
                        type="number"
                        name="phone"
                        variant="standard"
                        sx={{ width: "75%", m: 2 }}
                        onBlur={handleOnBlurO}
                    /><br />
                    {/* <input
                        id="standard-basic"
                        label="Product"
                        type="text"
                        style={{height:'30px', width:"75%",margin:"10px"}}
                        value={product || ''}
                        name="product"
                        
                        onBlur={handleOnBlurO}
                    /><br />
                    <input
                        id="standard-basic"
                        label="Price of single product"
                        type="text"
                        value={price || ''}
                        name="price"
                        variant="standard"
                        style={{ width: "75%", height:"30px", margin:"10px" }}
                        onBlur={handleOnBlurO}
                    /><br /> */}
                    <TextField
                        id="standard-basic"
                        label="Quantity"
                        type="number"
                        name="quantity"
                        variant="standard"
                        sx={{ width: "75%", m: 2 }}
                        onBlur={handleOnBlurO}
                    /><br />
                    <Button sx={{ width: 150, m: 2 }} type="submit" variant="contained">Submit</Button>
                    </form>
                    {success && <Alert severity="success">Added the Order successfully</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default PlaceOrder;