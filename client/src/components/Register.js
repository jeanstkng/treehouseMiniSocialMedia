import React from 'react'
import React, { useState, useContext, useEffect } from 'react'
import authContext from "../../context/authContext/authContext"
import 'bootstrap/dist/css/bootstrap.css'

const Register = (props) => {
    const { registerUser, userAuth, errors, setError, clearError } = useContext(authContext)

    const [ user, setUser ] = useState({ name:'', email:'', password:'', password2:''})
    const {name, email, password, password2} = user

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
        clearError()
    }

    const submit = e => {
        e.preventDefault()
        if (password !== password2) {
            setError({msg:"Passwords don't match"})
        }
        else{
            registerUser({name, email, password})
            clearError()
        }
    }

    return (
        <div className="container">
            <h3>Registro de Usuario</h3>
            <form className="form-group" onSubmit={submit}>
              <label for="name">Nombre</label>
              <input type="name" className="form-control" value={name} onChange={handleChange} name="name" aria-describedby="nameHelpId" placeholder="nombre"/>
              <small id="nameHelpId" className="form-text text-muted">Ingrese un nombre.</small>

              <label for="email">Email</label>
              <input type="email" className="form-control" value={email} onChange={handleChange} name="email" aria-describedby="emailHelpId" placeholder="Email"/>
              <small id="emailHelpId" className="form-text text-muted">Ingrese un email.</small>
              
              <label for="password">Password</label>
              <input type="password" className="form-control" value={password} onChange={handleChange} name="password" aria-describedby="passwordHelpId" placeholder="contrasena"/>
              <small id="passwordHelpId" className="form-text text-muted">Ingrese una contrasenia mayor a 6 digitos.</small>
            </form>
            {errors !== null && <button className="btn-danger">
                {errors.msg ? errors.msg : errors.error[0].msg}
                <span onClick={clearError}>X</span></button>}
        </div>
    )
}

export default Register
