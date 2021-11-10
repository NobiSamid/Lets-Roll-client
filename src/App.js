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

function App() {
  return (
    <div className="App">
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
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/register">
              <Register></Register>
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
