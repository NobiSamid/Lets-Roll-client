import { AccountCircle } from '@mui/icons-material';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { Alert, AlertTitle, Button, Container, LinearProgress, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {

    const [loginData, setLoginData] = useState({});

    const { user, loginUser, isLoading, authError, errorCode } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(loginData);
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password);
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>ekhane kichu ekta hudai display kora hobe</Grid>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleLoginSubmit}>
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
                        <NavLink style={{ textDecoration: "none" }} to="/register">
                            <Button variant="text">New user? Please, Register</Button>
                        </NavLink><br />
                        <Button sx={{ width: 150, m: 1 }} type="submit" variant="contained">Log-in</Button>
                        {isLoading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
                        {user?.email &&
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                User Logged in successfully — <strong>Congratulations!</strong>
                            </Alert>
                        }
                        {authError && <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {authError} — <strong>{errorCode}</strong>
                        </Alert>
                        }
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;