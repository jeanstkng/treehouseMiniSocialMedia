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
        <div className="register">
            <h1>Sign Up</h1>
            <form onSubmit={submit}>
                <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange}/>
                <input type="email" name="email" placeholder="E-mail" value={email} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange}/>
                <input type="password" name="password2" placeholder="Confirm Password" value={password2} onChange={handleChange}/>
                <input type="submit" value="Sign Up"/>
            </form>
            <div>
                    {errors !== null && <button className="btn btn-danger">
                    {errors.msg ? errors.msg : errors.error[0].msg}
                    <span onClick={clearError}>X</span></button>}
                <p>¿Ya estás registrado? {" "} <Link to='/login'>Logeate</Link></p>
            </div>
        </div>
    )
}

export default Register
