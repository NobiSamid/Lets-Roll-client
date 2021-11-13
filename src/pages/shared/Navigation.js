import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import useAuth from '../../Hooks/useAuth';
import AccountCircle from '@mui/icons-material/AccountCircle';


const Navigation = () => {

    const { user, logOut } = useAuth();

    ////////////////////// for mobile navigation bar functions //////////
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // console.log(isMobile);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" style={{ flex: 1, textAlign: "left" }}>
                        <a href="/" style={{textDecoration:"none", fontSize:"3rem", fontWeight:7000, fontFamily:"-moz-initial", color:"wheat", marginLeft:"5rem"}}>Let's Roll</a>
                    </Typography>
                    <Box style={{ width: "40%" }}>
                        {isMobile ? (

                            <>
                                {/***************** Navigation for Mobile ****************/}
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={handleMenu}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <NavLink style={{ textDecoration: "none", color: 'black' }} to="/">
                                            Home
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <NavLink style={{ textDecoration: "none", color: 'black' }} to="/products">
                                            Products
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        {
                                            user.email &&
                                            <NavLink style={{ textDecoration: "none", color: 'black' }} to="/dashboard">
                                                Dashboard
                                            </NavLink>
                                        }

                                    </MenuItem>
                                    {
                                        user.email &&
                                        <MenuItem>
                                            <Typography sx={{ fontFamily: "cursive", fontSize: "1.25rem", fontWeight: '600' }}><AccountCircle sx={{ mt: 1 }} />{user?.displayName}</Typography>
                                        </MenuItem>
                                    }

                                    <MenuItem onClick={handleClose}>
                                        {
                                            user.email ?
                                                (<>
                                                    <Button onClick={logOut} color="inherit">Log-Out</Button>
                                                </>)
                                                :
                                                (<NavLink style={{ textDecoration: "none", color: 'black' }} to="/login">
                                                    <Button color="inherit">Log-in</Button>
                                                </NavLink>)
                                        }

                                    </MenuItem>
                                </Menu>
                            </>) :
                            /**************************** navigation for Computer ****************/

                            (
                                <Box style={{ display: 'flex' }} sx={{ justifyContent: 'space-evenly', alignItems: 'center' }} >
                                    <NavLink style={{ textDecoration: "none", color: 'whitesmoke' }} to="/">
                                        Home
                                    </NavLink>

                                    <NavLink style={{ textDecoration: "none", color: 'whitesmoke' }} to="/products">
                                        Products
                                    </NavLink>

                                    {user.email &&
                                        <NavLink style={{ textDecoration: "none", color: 'whitesmoke' }} to="/dashboard">
                                            Dashboard
                                        </NavLink>
                                    }
                                    {
                                        user.email && <Typography sx={{ fontFamily: "cursive", fontSize: "1.5rem", fontWeight: '600' }}><AccountCircle sx={{ mt: 1 }} />{user?.displayName}</Typography>
                                    }

                                    {
                                        user.email ? (<Button onClick={logOut} color="inherit">log-out</Button>) : (
                                            <NavLink style={{ textDecoration: "none", color: 'whitesmoke' }} to="/login">
                                                <Button color="inherit">Log-in</Button>
                                            </NavLink>
                                        )
                                    }

                                </Box>
                            )}

                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;