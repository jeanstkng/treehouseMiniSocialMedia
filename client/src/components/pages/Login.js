import React, {useState, useContext, useEffect} from 'react'
import authContext from "../../context/authContext/authContext";
import { Link } from "react-router-dom";

const Login = (props) => {
    const { loginUser, userAuth, errors, clearError } = useContext(authContext)
    
    useEffect(
        () => {
            if (userAuth) {
                props.history.push('/')
            }
        }, [userAuth, props.history]
    )
    const [ user, setUser ] = useState({ email:'', password:'' })
    const { email, password } = user

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
        clearError()
    }

    const submit = e => {
        e.preventDefault()
        loginUser({ email, password})
    }

    return (
        <div className="container">
            <h1>TreeHouse - Iniciar Sesion</h1>
            <form onSubmit={submit} className="col-8">
                <div className="form-group row">
                  <label className="col-sm-2">Email</label>
                  <input type="text"
                    className="form-control col-sm-10" name="email" value={email} aria-describedby="emailId" onChange={handleChange}/>
                    <label className="col-sm-2"></label>
                    <small id="emailId" className="form-text text-muted col-sm-10">Introduzca un email.</small>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2">Contraseña</label>
                  <input type="password"
                    className="form-control col-sm-10" name="password" value={password} aria-describedby="passwordId" onChange={handleChange}/>
                    <label className="col-sm-2"></label>
                    <small id="passwordId" className="form-text text-muted col-sm-10">Introduzca su contraseña.</small>
                </div>
                
                <div className="row">
                    <label className="col-sm-2"></label>
                    <input type="submit" value="Ingresar" className="btn btn-primary col-sm-6"/>
                </div>
                
            </form>
            <div className="row">
                {errors !== null && <button className="btn btn-danger">
                    {errors.msg ? errors.msg : errors.error[0].msg}
                    <span onClick={clearError}>&nbsp;X</span></button>}
                <label className="col-sm-2"></label>
                <p className="col-sm-10">¿Aún no te registras? {" "} <Link to='/register'>Registrate</Link></p>
            </div>
        </div>
    )
}

export default Login
