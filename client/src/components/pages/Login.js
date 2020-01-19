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
        <div>
            <h1>Login</h1>
            <form onSubmit={submit}>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text"
                    className="form-control" name="email" value={email} aria-describedby="emailId" onChange={handleChange}/>
                  <small id="emailId" className="form-text text-muted">Introduzca un email.</small>
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input type="text"
                    className="form-control" name="password" value={password} aria-describedby="passwordId" onChange={handleChange}/>
                  <small id="passwordId" className="form-text text-muted">Introduzca su contraseña.</small>
                </div>
                <input type="submit" value="Ingresar" className="btn btn-primary"/>
            </form>
            <div>
                {errors !== null && <button className="btn btn-danger">
                    {errors.msg ? errors.msg : errors.error[0].msg}
                    <span onClick={clearError}>X</span></button>}
                <p>¿Aún no te registras? {" "} <Link to='/register'>Registrate</Link></p>
            </div>
        </div>
    )
}

export default Login
