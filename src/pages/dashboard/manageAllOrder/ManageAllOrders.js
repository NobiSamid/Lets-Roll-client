import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';

const ManageAllOrders = () => {

    const [ allOrders, setAllOrders] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/orders")
        .then(res=>res.json())
        .then(data=>setAllOrders(data))
    },[]);
    console.log(allOrders);

    const handleDeleteOrder = (id) =>{
        console.log("hello there you wanna delete", id);
        const proceed = window.confirm('Are you sure, you want to delete this order ?????');
        if(proceed){
            console.log('delete kore dei eta?', id);
            const url = `http://localhost:5000/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount){
                    alert("successfully deleted")
                    const remaining = allOrders.filter(ord => ord._id !== id);
                    setAllOrders(remaining);
                }
            })
        }
    }

    return (
        <div>
            <h3>Manage all orders here like order shipping or pending</h3>
            <TableContainer component={Paper}>
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
                        {allOrders.map((row) => (
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
                                <TableCell align="left"><Button onClick={()=> handleDeleteOrder(row._id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageAllOrders;