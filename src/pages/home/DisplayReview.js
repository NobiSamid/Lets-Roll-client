import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

const DisplayReview = () => {

    const [review, setReview] = useState([]);

    useEffect(()=>{
        // fetch('http://localhost:5000/reviews')
        fetch('https://aqueous-mountain-11815.herokuapp.com/reviews')
        .then(res=>res.json())
        .then(data=>setReview(data))
    },[]);
    console.log(review);
  return (
    <div>{ review.length === 0 ? <CircularProgress /> :
      <TableContainer component={Paper} sx={{width:"60%", mx:'auto'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="left">Topic</TableCell>
                            <TableCell align="left">Rating</TableCell>
                            <TableCell align="left">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {review.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                  {row.user}
                                </TableCell>
                                <TableCell align="left">{row.subject}</TableCell>
                                <TableCell align="left"><Rating name="half-rating-read" precision={0.5} value={parseFloat(row.rating)} readOnly /></TableCell>
                                <TableCell align="left">{row.opinion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    }
    </div>
  );
};

export default DisplayReview;