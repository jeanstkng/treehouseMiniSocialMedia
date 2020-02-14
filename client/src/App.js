import React from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown, faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home'
import PrivateRoute from './components/pages/routes/PrivateRoute'
import Register from './components/pages/Register'
import Login from "./components/pages/Login";
import AuthState from "./context/authContext/AuthState"
import FriendState from './context/friendContext/FriendState'
import PostState from "./context/postContext/PostState"
import setToken from './utils/setToken'

library.add(faArrowDown,faArrowUp, faArrowAltCircleRight, faArrowAltCircleLeft)

if (localStorage.token) {
  setToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
    <PostState>
    <FriendState>
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
    </FriendState>
    </PostState>
    </AuthState>
  );
}

export default App;
