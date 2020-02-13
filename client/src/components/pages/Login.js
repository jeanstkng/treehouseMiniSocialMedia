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
        if (errors !== null) { clearError() }
    }
    if(errors && errors.error){
        console.log(errors.error.msg)
        }
   
    const submit = e => {
        e.preventDefault()
        loginUser({ email, password})
        clearError()
    }

    var divStyle = {
        display: 'block',
        textAlign: 'center'
    }
    var form =
    {
        display: 'inline-block',
    }

    return (
        <div className="container text-center mt-5">
            <h1>TreeHouse - Iniciar Sesión</h1>
            <div style={divStyle}>
            <form onSubmit={submit} style={form}>
                <div className="form-group row">
                  <label className="col-sm-3 mr-2 font-weight-bold">Email</label>
                  <input type="text"
                    className="form-control col-sm-8" placeHolder="Ingrese un email." name="email" value={email} aria-describedby="emailId" onChange={handleChange}/>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 mr-2 font-weight-bold">Contraseña</label>
                  <input type="password"
                    className="form-control col-sm-8" placeHolder="Ingrese una contraseña." name="password" value={password} aria-describedby="passwordId" onChange={handleChange}/>
                    <label className="col-sm-2"></label>
                    <small id="passwordId" className="form-text text-muted col-sm-10"></small>
                </div>
                
                <div className="row">
                    <label className="col-sm-3 mr-2"></label>
                    <input type="submit" value="Ingresar" className="btn btn-primary col-sm-4"/>
                </div>
                
            </form>
            <div className="row">
                {errors !== null && <button className="btn btn-danger">
                    {errors}
                    <span onClick={clearError}>&nbsp;X</span></button>}
                <label className="col-sm-2"></label>
                <p className="col-sm-8">¿Aún no te registras? {" "} <Link to='/register'>Registrate</Link></p>
            </div>
            </div>
        </div>
    )
}

export default Login
