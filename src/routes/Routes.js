import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Signin';
import Signup from '../pages/Signup';
import User from '../pages/User';
import Admin from '../pages/Admin';
import PrivateRoute from '../auth/PrivateRoute';
import AdminRoute from '../auth/AdminRoute';

function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signin" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <PrivateRoute path="/user/dashboard" exact component={User}/>
        <AdminRoute path="/admin/dashboard" exact component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;