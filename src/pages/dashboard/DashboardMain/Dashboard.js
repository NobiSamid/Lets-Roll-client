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

const drawerWidth = 220;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Route match for nested routing
  let { path, url } = useRouteMatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Link to="/"><Button color="inherit">Back to Home</Button></Link><br />
      <Link to={`${url}`}><Button color="inherit">Dashboard</Button></Link><br/>
      <Link to={`${url}/review`}><Button color="inherit">Review</Button></Link><br />
      <Button variant="contained" color="inherit">Log out</Button>
      <Divider />
      <Link to={`${url}/manageallorder`}><Button color="inherit">Manage all Order</Button></Link>
      <Link to={`${url}/addproduct`}><Button color="inherit">Add a product</Button></Link>
      <Link to={`${url}/manageproducts`}><Button color="inherit">Manage Products</Button></Link>
      <Link to={`${url}/createadmin`}><Button color="inherit">Create Admin</Button></Link>
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

        <Switch>
          <Route exact path={path}>
            <MyOrders></MyOrders>
          </Route>
          <Route path={`${path}/review`}>
            <Review></Review>
          </Route>
          <Route path={`${path}/manageallorder`}>
            <ManageAllOrders></ManageAllOrders>
          </Route>
          <Route path={`${path}/addproduct`}>
            <AddProduct></AddProduct>
          </Route>
          <Route path={`${path}/manageproducts`}>
            <ManageProduct></ManageProduct>
          </Route>
          <Route path={`${path}/createadmin`}>
            <CreateAdmin></CreateAdmin>
          </Route>
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
