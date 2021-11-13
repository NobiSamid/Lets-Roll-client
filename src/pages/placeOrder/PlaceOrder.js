import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const PlaceOrder = () => {
    //Authentication functions that returned
    const { user } = useAuth();

    ////////////////// dianamic routing key
    const { pkey } = useParams();

    ///////// fetch product data and setting to the state also order submition confermation state
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

    const initialInfoOrder = { quantity: 1 }
    const [placeOrder, setPlaceOrder] = useState(initialInfoOrder);
    // console.log(placeOrder);

    // console.log(initialInfoOrder);

    /////////////////////////// Taking data from input field and Db and mearging into a single object
    const handleOnBlurO = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newOrder = {
            ...placeOrder,
            user: user.displayName,
            email: user.email,
            product: product,
            price: price,
            status: 'pending'
        };
        newOrder[field] = value;
        setPlaceOrder(newOrder);
        // console.log(newOrder);
    }

    //////////////////////////// ONsubmit order form fired function
    const handleOrderSubmit = e => {


        // fetch('http://localhost:5000/orders', {
        fetch('https://aqueous-mountain-11815.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(placeOrder)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged === true) {
                    console.log("operation success");
                    setSuccess(true)
                }
            })
        console.log(placeOrder);
        e.preventDefault();
    }
    return (
        <Container style={{ minHeight: '100vh' }} >
            <Typography sx={{ p: 0.5, fontSize: "3rem", mt: 2 }}>Confirm your Purchase</Typography>
            <Grid sx={{ height: '50vh' }} container spacing={2} >
                <Grid item sx={{ my: 'auto' }} sm={12} md={6} >
                    <Typography sx={{ p: 0.5, textAlign: "left", fontSize: "2rem" }}><span style={{ fontSize: '2.10rem', fontWeight: "600" }}>Product: </span>{order.title}</Typography>
                    <Typography sx={{ p: 0.5, textAlign: "left", fontSize: "1.5rem" }}><span style={{ fontSize: '1.75rem', fontWeight: "600" }}>Price: </span>${order.price}</Typography>
                    <Typography sx={{ p: 0.5, textAlign: "left", fontSize: "1.5rem" }}><span style={{ fontSize: '1.75rem', fontWeight: "600" }}>Emptor: </span>{user?.displayName}</Typography>
                    <Typography sx={{ p: 0.5, textAlign: "left", fontSize: "1.5rem" }}><span style={{ fontSize: '1.75rem', fontWeight: "600" }}>Emptor email: </span>{user?.email}</Typography>
                </Grid>
                <Grid item sx={{ my: 'auto' }} sm={12} md={6} >
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