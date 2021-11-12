import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';

const ManageProduct = () => {

    const [allProducts, setAllProducts] = useState([]);

    useEffect(()=>{
        // fetch("http://localhost:5000/products")
        fetch("https://aqueous-mountain-11815.herokuapp.com/products")
        .then(res=>res.json())
        .then(data=>setAllProducts(data))
    },[]);
    console.log(allProducts);

    const handleDeleteProduct = (id) =>{
        console.log("hello there you wanna delete", id);
        const proceed = window.confirm('Are you sure, you want to delete this Product ?????');
        if(proceed){
            console.log('delete kore dei eta?', id);
            // const url = `http://localhost:5000/products/${id}`;
            const url = `https://aqueous-mountain-11815.herokuapp.com/products/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount){
                    alert("successfully deleted")
                    const remaining = allProducts.filter(prdc => prdc._id !== id);
                    setAllProducts(remaining);
                }
            })
        }
    }

    return (
        <div>
            <Typography sx={{fontSize:"3rem", fontWeight:"600"}}>Products of store</Typography>
            { allProducts.length === 0 ? <CircularProgress style={{marginTop:"100px", marginBottom:"100px"}} /> : <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="left">Price(1)</TableCell>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allProducts.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="left">{row.price}</TableCell>
                                <TableCell align="left"><img src={row.photo} alt={row.title} style={{width:"50px", height:"auto", borderRadius:"25%"}} /></TableCell>
                                <TableCell align="left">{row.info}</TableCell>
                                <TableCell align="left"><Button onClick={()=> handleDeleteProduct(row._id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </div>
    );
};

export default ManageProduct;