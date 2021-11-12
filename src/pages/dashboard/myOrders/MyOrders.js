import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { typography } from '@mui/system';


const MyOrders = () => {
    const { user } = useAuth();
    const [myOrders, setMyOrders] = useState([])

    useEffect(()=>{
        // const url = `http://localhost:5000/orderof?email=${user.email}`
        const url = `https://aqueous-mountain-11815.herokuapp.com/orderof?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>setMyOrders(data))
    },[])
    console.log(myOrders);

    const handleDeleteMyOrder = (id) =>{
        console.log('delete kore dei ', id)
        const proceed = window.confirm('Are you sure, you want to delete this order ?????');
        if(proceed){
            console.log('delete kore dei eta?', id);
            // const url = `http://localhost:5000/orders/${id}`;
            const url = `https://aqueous-mountain-11815.herokuapp.com/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount){
                    alert("successfully deleted")
                    const remaining = myOrders.filter(ord => ord._id !== id);
                    setMyOrders(remaining);
                }
            })
        }
    }
    return (
        <div>
            <Typography sx={{fontSize:"3rem", fontWeight:"600"}}>Product that you have orderd</Typography>
            { myOrders.length === 0 ? <CircularProgress style={{marginTop:"100px", marginBottom:"100px"}} /> : <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="left">User</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Price(1)</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myOrders.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.product}
                                </TableCell>
                                <TableCell align="left">{row.user}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.price}</TableCell>
                                <TableCell align="left">{row.quantity}</TableCell>
                                <TableCell align="left"><Button onClick={()=> handleDeleteMyOrder(row._id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </div>
    );
};

export default MyOrders;