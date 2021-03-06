import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import jwt_decode from "jwt-decode"
import store from "../../redux/store"
import { setCurrentUser, logout } from "./../../redux/actions/auth";

import Footer from '../components/nav/Footer';
import Private from '../components/nav/Private';
import Public from '../components/nav/Public';
import Navigation from '../components/nav/Navigation';

import Landing from '../pages/public/Landing';
import AboutUs from '../pages/public/AboutUs';
import Contacts from '../pages/public/Contacts';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

import Dashboard from '../pages/private/Dashboard';
import AccountPage from '../pages/private/AccountPage';
import PatientList from '../pages/private/PatientList';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLogin from '../pages/admin/AdminLogin';
import Authorized from '../components/nav/Authorized';

if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logout());
  }
}


const App = () => {
  return (
    <Provider store={store}>
        <Router>
          <Navigation/>
       <Switch>
          <div className="page landing-page">
          <Public exact path="/" component={Landing}/>
          <Public exact path="/about" component={AboutUs}/>
          <Public exact path="/contact-us" component={Contacts}/>
          <Public exact path="/login" component={Login}/>
          <Public exact path="/register" component={Register}/>
          <Private exact path="/dashboard" component={Dashboard}/>
          <Private exact path="/settings" component={AccountPage}/>
          <Private exact path="/patient/:id" component={AccountPage}/>
          <Private exact path="/patients" component={PatientList}/>
          <Authorized exact path="/admin-dashboard" component={AdminDashboard}/>
          <Authorized exact path="/admin" component={AdminLogin}/>
          </div>
       </Switch>
       <Footer/>
        </Router>

    </Provider>
  );
}

export default App;
