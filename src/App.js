import './App.css';
import Dashboard from './pages/dashboard/DashboardMain/Dashboard';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from './pages/shared/Navigation';
import Footer from './pages/shared/Footer';
import Login from './pages/authentication/signUpIn/Login';
import Register from './pages/authentication/signUpIn/Register';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './pages/authentication/privateroute/PrivateRoute';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Notfound from './pages/notfound/Notfound';

function App() {
  return (
    <div className="App">

      {/* all Routes which are nested into authProvider to share data of useAuth with all component */}
      <AuthProvider>
        <Router>
          <Navigation></Navigation>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/products">
              <Products></Products>
            </Route>

            {/********************************* Private Route ***********************/}
            <PrivateRoute path="/products/:pkey">
              <PlaceOrder></PlaceOrder>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/register">
              <Register></Register>
            </Route>
            <Route path="*">
              <Notfound></Notfound>
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
