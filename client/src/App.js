import React from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home'
import PrivateRoute from './components/pages/routes/PrivateRoute'
import Register from './components/pages/Register'
import Login from "./components/pages/Login";
import AuthState from "./context/authContext/AuthState"
import setToken from './utils/setToken'

if (localStorage.token) {
  setToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <Router>
        <div>
          <Switch>
            <PrivateRoute exact path = '/' component={Home}/>
            <Route exact path = "/register" component={Register}/>
            <Route exact path = "/login" component={Login}/>
          </Switch>
          <script type="text/javascript" src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        </div>
      </Router>
    </AuthState>
  );
}

export default App;
