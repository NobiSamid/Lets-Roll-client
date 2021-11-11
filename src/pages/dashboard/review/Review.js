import { Alert, Button, Container, Grid, Rating, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const Review = () => {
    const { user } = useAuth();

    const initialInfo = { user: user.displayName, subject: '', opinion: '' }

    const [review, setReview] = useState(initialInfo);
    const [success, setSuccess] = useState(false);
    const [rate, setRate] = useState(1);
    console.log(rate);


    const handleOnBlurR = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        let newReview = { ...review };
        newReview[field] = value;
        newReview.rating = rate;
        setReview(newReview);
        console.log(newReview);
    }

    const handleReviewSubmit = e => {
        fetch('http://localhost:5000/reviews',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(review)
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
                <Grid item sm={12} md={6}>
                    <Typography>{user?.displayName}</Typography>
                    <Typography>{user?.email}</Typography>
                </Grid>
                <Grid item sm={12} md={6}>
                    <form onSubmit={handleReviewSubmit}>
                        <TextField
                            id="standard-basic"
                            label="User Name"
                            type="text"
                            defaultValue={user.displayName}
                            name="user"
                            variant="standard"
                            sx={{ width: "75%", m: 2 }}
                            onBlur={handleOnBlurR}
                        /><br />
                        <Typography>Rate us</Typography>
                        <Rating
                            name="simple-controlled"
                            value={rate}
                            onChange={(event, newValue) => {
                                setRate(newValue);
                            }}
                        /><br />
                        <TextField
                            id="standard-basic"
                            label="Subject"
                            type="text"
                            name="subject"
                            variant="standard"
                            sx={{ width: "75%", m: 2 }}
                            onBlur={handleOnBlurR}
                        /><br />
                        <TextField
                            id="standard-basic"
                            label="Opinion"
                            type="text"
                            multiline
                            name="opinion"
                            variant="standard"
                            sx={{ width: "75%", m: 2 }}
                            onBlur={handleOnBlurR}
                        /><br />
                        
                        <Button sx={{ width: 150, m: 2 }} type="submit" variant="contained">Submit</Button>
                    </form>
                    {success && <Alert severity="success">Added the product successfully</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Review;