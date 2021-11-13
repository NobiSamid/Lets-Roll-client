import { Alert, Button, Container, Divider, Grid, Rating, TextField, Typography } from '@mui/material';
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
        // fetch('http://localhost:5000/reviews',{
        fetch('https://aqueous-mountain-11815.herokuapp.com/reviews',{
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
                    <Typography sx={{fontSize:"2rem", fontWeight:"600"}}>{user?.displayName}</Typography>
                    <Typography sx={{fontSize:"2rem", fontWeight:"600"}}>{user?.email}</Typography>
                    <Divider />
                    <Typography sx={{fontSize:"1.5rem", fontWeight:"500"}}>Please let us know about your experience. We value our every single customer. Don't have a good day , Have a greate day</Typography>
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
                            name="half-rating"
                            size="large"
                            value={rate}
                            precision={0.5}
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
                    {success && <Alert severity="success">Review submitted successfully</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Review;