import React from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown, faArrowAltCircleLeft, faArrowAltCircleRight,
          faUser, faTrashAlt, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home'
import PrivateRoute from './components/pages/routes/PrivateRoute'
import Register from './components/pages/Register'
import Login from "./components/pages/Login";
import AuthState from "./context/authContext/AuthState"
import FriendState from './context/friendContext/FriendState'
import PostState from "./context/postContext/PostState"
import CommentState from "./context/commentContext/CommentState"
import RequestState from './context/requestContext/RequestState'
import setToken from './utils/setToken'

library.add(faArrowDown,faArrowUp, faArrowAltCircleRight, faArrowAltCircleLeft, faUser, faTrashAlt, faPlus, faCheck )

if (localStorage.token) {
  setToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
    <PostState>
    <RequestState>
    <FriendState>
    <CommentState>
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
    </CommentState>
    </FriendState>
    </RequestState>
    </PostState>
    </AuthState>
  );
}

export default App;
