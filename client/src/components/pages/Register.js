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
            setError({msg:"Contraseñas no concuerdan."})
        }
        else{
            registerUser({name, email, password})
            clearError()
        }
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
            <div className="card">
                <h1>TreeHouse - Registro</h1>
                <div style={divStyle}>
                <form style={form} onSubmit={submit}>
                    <div className="form-group row">
                        <label className="col-sm-4 font-weight-bold">Nombre</label>
                        <input required className="form-control col-sm-8" type="text" name="name" placeholder="Ingrese su nombre." value={name} onChange={handleChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 font-weight-bold">Email</label>
                        <input required className="form-control col-sm-8" type="email" name="email" placeholder="Ingrese su email." value={email} onChange={handleChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 font-weight-bold">Contraseña</label>
                        <input required className="form-control col-sm-8" type="password" name="password" placeholder="Ingrese su contraseña." value={password} onChange={handleChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 font-weight-bold">Confirmar Contraseña</label>
                        <input required className="form-control col-sm-8" type="password" name="password2" placeholder="Confirme su contraseña." value={password2} onChange={handleChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4"></label>
                        <input className="btn btn-primary col-sm-5" type="submit" value="Registrarse"/>
                    </div>
                </form>
                <div className="row">
                        {errors !== null && <button className="btn btn-danger">
                        {errors ? errors.msg : null}
                        {errors && errors.error ? errors.error[0].msg : null}
                        <span onClick={clearError}>&nbsp;X</span></button>}
                    <label className="col-sm-2"></label>
                    <p className="col-sm-8">¿Ya estás registrado? {" "} <Link to='/login'>Logeate</Link></p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Register
