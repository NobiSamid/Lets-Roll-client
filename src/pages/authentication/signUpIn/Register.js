import { AccountCircle } from '@mui/icons-material';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { Alert, AlertTitle, Button, Container, Grid, LinearProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {

    const [loginData, setLoginData] = useState({});

    const { user, registerUser, isLoading, authError, errorCode } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(loginData);
    }

    const handleRegisterSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert("Your password did not mached")
            return
        }
        registerUser(loginData.email, loginData.password);
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>ekhane kichu ekta hudai display kora hobe</Grid>
                <Grid item xs={12} md={6}>
                    {!isLoading && <form onSubmit={handleRegisterSubmit}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx"
                                type="email"
                                label="Email"
                                sx={{ width: "75%", m: 1 }}
                                variant="standard"
                                name="email"
                                onBlur={handleOnBlur}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <VpnKeyRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx"
                                type="password"
                                label="Password"
                                sx={{ width: "75%", m: 1 }}
                                variant="standard"
                                name="password"
                                onBlur={handleOnBlur}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <VpnKeyRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx"
                                type="password"
                                label="Confirm Password"
                                sx={{ width: "75%", m: 1 }}
                                variant="standard"
                                name="password2"
                                onBlur={handleOnBlur}
                            />
                        </Box>
                        <NavLink style={{ textDecoration: "none" }} to="/login">
                            <Button variant="text">Already Registered? Login</Button>
                        </NavLink><br />
                        <Button sx={{ width: 150, m: 1 }} type="submit" variant="contained">Register</Button>
                    </form>}
                    {isLoading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
                    {user?.email &&
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                                User Registered successfully — <strong>Congratulations!</strong>
                        </Alert>
                    }
                    {authError && <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                            {authError} — <strong>{errorCode}</strong>
                        </Alert>
                    }

                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;