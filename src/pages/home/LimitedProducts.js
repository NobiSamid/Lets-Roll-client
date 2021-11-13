import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const LimitedProducts = () => {
    const [limitedProducts, setLimitedProducts] = useState([]);

    useEffect(() => {
        // fetch('http://localhost:5000/limitedproduct')
        fetch('https://aqueous-mountain-11815.herokuapp.com/limitedproduct')
            .then(res => res.json())
            .then(data => setLimitedProducts(data))
    }, [])
    console.log(limitedProducts);
    return (
        <div>{ limitedProducts.length === 0 ? <CircularProgress /> :
            <Grid container sx={{ my: 5, mr: 5 }} spacing={1}>
                {
                    limitedProducts.map(product => <Grid
                        key={product._id}
                        product={product}
                        item
                        sx={{ my: 3, mx: "auto" }}
                        xs={12}
                        sm={6}
                        md={4}
                    >
                        <Card sx={{ maxWidth: "80%", mx: "auto" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300px"
                                    width="50%"
                                    image={product.photo}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {product.info}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        $ {product.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Link style={{textDecoration:"none", margin:"auto"}} to={`/products/${product._id}`}>
                                    <Button sx={{ mx: "auto" }} size="large" variant="outlined" color="success" endIcon={<AddShoppingCartIcon />}>
                                        Purchase
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>

                    </Grid>)
                }
            </Grid>
        }</div>
    );
};

export default LimitedProducts;