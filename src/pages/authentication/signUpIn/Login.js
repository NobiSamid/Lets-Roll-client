import { AccountCircle } from '@mui/icons-material';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { Alert, AlertTitle, Button, Container, LinearProgress, TextField, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {

    const [loginData, setLoginData] = useState({});

    const { user, loginUser, signWithGoogle, isLoading, authError, errorCode } = useAuth();

    const location = useLocation();
    const history = useHistory();

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
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    const handleGoogleSignIn = () =>{
        signWithGoogle(location, history);
    }

    return (
        <Container sx={{height:"50vh"}}>
            <Grid container spacing={2}>
                <Grid sx={{my:"auto", pr:8}} item xs={12} md={6}>
                    <Typography sx={{fontSize:'2rem', fontWeight:'500'}}>Please Log in to purchase and experience many more features</Typography>
                </Grid>
                <Grid sx={{mt:8}} item xs={12} md={6}>
                    <form onSubmit={handleLoginSubmit} style={{borderBottom:"2px solid black", marginBottom:"3px", paddingBottom:"20px"}} >
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
                    </form><br/>
                    <Button onClick={handleGoogleSignIn} variant="contained" color="warning">Google sign In</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;