import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { title, info, price, photo, _id } = props.product || {};
    return (
        <Grid sx={{my:3, mx:"auto"}} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth:"80%", mx:"auto" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="300px"
                        width="50%"
                        image={photo}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {info}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            $ {price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={`/products/${_id}`}>
                        <Button sx={{mx:"auto"}} size="large" variant="outlined" color="success" endIcon={<AddShoppingCartIcon />}>
                            Purchase
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Product;