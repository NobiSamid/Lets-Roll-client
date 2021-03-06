import { Button, CircularProgress, FormControlLabel, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import ConfirmDialog from '../confirmDialog/ConfirmDialog';
import DeleteNotification from '../DeleeteNotification/DeleteNotification';

const ManageAllOrders = () => {

    ////////// states
    const [allOrders, setAllOrders] = useState([]);
    const [status, setStatus] = useState('pending');
    const [updatedOrder, setUpdatedOrder] = useState({});
    const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, title: '', subTitle: '' });
    const [deleteNotification, setDeleteNotification] = useState({ isOpen: false, title: '', subTitle: '' })


    // console.log(status);

    ////////////////////fetching data from Db or orders
    useEffect(() => {
        // fetch("http://localhost:5000/orders")
        fetch("https://aqueous-mountain-11815.herokuapp.com/orders")
            .then(res => res.json())
            .then(data => setAllOrders(data))
    }, []);
    // console.log(allOrders);

    ////////////////////////////////////// Delete Order from database function
    const handleDeleteOrder = (id) => {
        // console.log("hello there you wanna delete", id);
        // const proceed = window.confirm('Are you sure, you want to delete this order ?');
        setConfirmDelete({
            ...confirmDelete,
            isOpen: false
        })
        setDeleteNotification({
            ...deleteNotification,
            isOpen: false
        })
        // if (proceed) {
        // console.log('delete kore dei eta?', id);
        // const url = `http://localhost:5000/orders/${id}`;
        const url = `https://aqueous-mountain-11815.herokuapp.com/orders/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.deletedCount) {
                    setDeleteNotification(
                        {
                            isOpen: true,
                            title: 'Done',
                            subTitle: "Order succssfully deleted",
                        }
                    )
                    // alert("successfully deleted")
                    const remaining = allOrders.filter(ord => ord._id !== id);
                    setAllOrders(remaining);
                }
            })
        // }
    }


    //////////////////////////////////// Update order of database function
    const handleUpdateOrder = (id) => {
        // const url = `http://localhost:5000/orders/${id}`;
        const url = `https://aqueous-mountain-11815.herokuapp.com/orders/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUpdatedOrder(data))
        console.log(updatedOrder)
        const newUpdatedOrder = { ...updatedOrder, status: status }
        // console.log(newUpdatedOrder);
        console.log(Object.keys(newUpdatedOrder).length);
        // if(Object.keys(newUpdatedOrder).length === 7){
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUpdatedOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // console.log(data);
                    alert('Status Updated successfully, please Refresh to see the result')
                }
            })
    }

    return (
        <div>
            <h2>Manage all ordered products</h2>
            {allOrders.length === 0 ? <CircularProgress style={{ marginTop: "100px", marginBottom: "100px" }} /> : <TableContainer sx={{ width: "80%", mx: 'auto' }} component={Paper}>
                <Table sx={{ minWidth: "50%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="left">User</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Price(1)</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Delete</TableCell>
                            <TableCell align="left">Select-Status</TableCell>
                            <TableCell align="left">Update</TableCell>
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
                                <TableCell align="left">{row?.status}</TableCell>

                                {/* Delete order firing button */}
                                <TableCell align="left"><Button onClick={() => {
                                    setConfirmDelete(
                                        {
                                            isOpen: true,
                                            title: 'Are you sure to delete this order?',
                                            subTitle: "You can't undo this operation",
                                            onConfirm: () => { handleDeleteOrder(row._id) }
                                        }
                                    )
                                }}>Delete</Button></TableCell>

                                {/* Update status changing radio button */}
                                <TableCell align="left">
                                    <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                                        <FormControlLabel value="approved" control={<Radio />} label="Approved" />
                                        <FormControlLabel value="shipped" control={<Radio />} label="Shipped" />
                                    </RadioGroup>
                                </TableCell>

                                {/* Update status firing button */}
                                <TableCell align="left"><Button onClick={() => handleUpdateOrder(row._id)}>Update Status</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            <ConfirmDialog
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
            ></ConfirmDialog>
            <DeleteNotification
                deleteNotification={deleteNotification}
                setDeleteNotification={setDeleteNotification}
            ></DeleteNotification>
        </div>
    );
};

export default ManageAllOrders;