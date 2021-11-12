import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';



const CreateAdmin = () => {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);


    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user = { email };
        // fetch('http://localhost:5000/users/admin', {
        fetch('https://aqueous-mountain-11815.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount){
                    console.log(data);
                    setSuccess(true)
                    console.log(success);
                }
                
            })
        e.preventDefault()
    }
    return (
        <div>
            <h3>Create admin here</h3>
            <form onSubmit={handleAdminSubmit}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: "30%", mx:"auto" }}
                        type="email"
                        label="Input Admin email"
                        variant="standard"
                        onBlur={handleOnBlur}
                    /><br /><br />
                <Button variant="contained" color="success" type="submit">Make Admin</Button>
            </form>
            {success && <Alert severity="success">user added to the admin panal successfully</Alert>}
        </div>
    );
};

export default CreateAdmin;