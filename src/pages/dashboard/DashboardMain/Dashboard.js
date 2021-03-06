import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import MyOrders from '../myOrders/MyOrders';
import CreateAdmin from '../createAdmin/CreateAdmin';
import Review from '../review/Review';
import ManageAllOrders from '../manageAllOrder/ManageAllOrders';
import AddProduct from '../addProduct/AddProduct';
import ManageProduct from '../manageProduct/ManageProduct';
import useAuth from '../../../Hooks/useAuth';
import AdminRoute from '../../authentication/adminRoute/AdminRoute';
import Payment from '../pament/Payment';

////////////////////// Dashboard component

const drawerWidth = 220;

/////////////////////Dashboard functions from MUI
function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  //////////////////// Route match for nested routing
  let { path, url } = useRouteMatch();
  const { admin, logOut } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Toolbar />

      {/************************** Route Links of dashboard *******************************/}
      <Link to="/" style={{ textDecoration: 'none' }} ><Button variant="outlined" style={{ margin: "10px" }} color="secondary">Back to Home</Button></Link><br />
      <Link to={`${url}`} style={{ textDecoration: 'none' }} ><Button variant="outlined" style={{ margin: "10px" }} color="secondary">Dashboard</Button></Link><br />
      <Link style={{ textDecoration: "none" }} to={`${url}/review`} ><Button variant="outlined" style={{ margin: "10px" }} color="secondary">Review</Button></Link><br />
      <Link to={`${url}/payment`} style={{ textDecoration: 'none' }} ><Button variant="outlined" style={{ margin: "10px" }} color="secondary">Payment</Button></Link><br />
      <Button variant="contained" onClick={logOut} color="inherit">Log out</Button>
      <Divider style={{ margin: "20px" }} />
      {admin && <Box>
        <Link to={`${url}/manageallorder`} style={{ textDecoration: 'none' }} ><Button variant="outlined" color="secondary">Manage all Order</Button></Link>
        <Link to={`${url}/addproduct`} style={{ textDecoration: 'none' }} ><Button variant="outlined" style={{ margin: "10px" }} color="secondary">Add a product</Button></Link>
        <Link to={`${url}/manageproducts`} style={{ textDecoration: 'none' }} ><Button variant="outlined" style={{ margin: "10px" }} color="secondary">Manage Products</Button></Link>
        <Link to={`${url}/createadmin`} style={{ textDecoration: 'none' }}><Button variant="outlined" color="secondary">Create Admin</Button></Link>
      </Box>}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/************************** Dashbard nested routing *******************************/}
        <Switch>
          <Route exact path={path}>
            <MyOrders></MyOrders>
          </Route>
          <Route path={`${path}/review`}>
            <Review></Review>
          </Route>
          <Route path={`${path}/payment`}>
            <Payment></Payment>
          </Route>
          <AdminRoute path={`${path}/manageallorder`}>
            <ManageAllOrders></ManageAllOrders>
          </AdminRoute>
          <AdminRoute path={`${path}/addproduct`}>
            <AddProduct></AddProduct>
          </AdminRoute>
          <AdminRoute path={`${path}/manageproducts`}>
            <ManageProduct></ManageProduct>
          </AdminRoute>
          <AdminRoute path={`${path}/createadmin`}>
            <CreateAdmin></CreateAdmin>
          </AdminRoute>
        </Switch>

      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
