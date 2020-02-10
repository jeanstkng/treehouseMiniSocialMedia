import React, { useState, useContext, useEffect } from 'react'
import authContext from "../../context/authContext/authContext";
import { Link } from 'react-router-dom'

const Register = (props) => {
    const { registerUser, userAuth, errors, setError, clearError } = useContext(authContext)
    useEffect(
        () => {
            if (userAuth) {
                props.history.push('/')    
            }
        }, [userAuth, props.history]
    )
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
        <div className="container col-md-8">
            <h1>TreeHouse - Registro</h1>
            <form onSubmit={submit}>
                <div className="form-group row">
                    <label className="col-sm-2">Nombre</label>
                    <input className="form-control col-sm-10" type="text" name="name" placeholder="Nombre" value={name} onChange={handleChange}/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2">Email</label>
                    <input className="form-control col-sm-10" type="email" name="email" placeholder="E-mail" value={email} onChange={handleChange}/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2">Contrasena</label>
                    <input className="form-control col-sm-10" type="password" name="password" placeholder="" value={password} onChange={handleChange}/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2">Confirmar Contrasena</label>
                    <input className="form-control col-sm-10" type="password" name="password2" placeholder="Confirmar" value={password2} onChange={handleChange}/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2"></label>
                    <input className="btn btn-primary col-sm-6" type="submit" value="Registrarse"/>
                </div>
            </form>
            <div className="row">
                    {errors !== null && <button className="btn btn-danger">
                    {errors.msg ? errors.msg : errors.error[0].msg}
                    <span onClick={clearError}>&nbsp;X</span></button>}
                <label className="col-sm-2"></label>
                <p className="col-sm-10">¿Ya estás registrado? {" "} <Link to='/login'>Logeate</Link></p>
            </div>
        </div>
    )
}

export default Register
