import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/pages/Register'
import AuthState from "./context/authContext/AuthState"
import setToken from './utils/setToken'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

if (localStorage.token) {
  setToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <Router>
        <Register/>
      </Router>
    </AuthState>
  );
}

export default App;
