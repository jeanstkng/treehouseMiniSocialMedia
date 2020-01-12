import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const Register = () => {
    return (
        <div className="container">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" name="email" aria-describedby="emailHelpId" placeholder="Email"/>
              <small id="emailHelpId" class="form-text text-muted">Ingrese un email.</small>
            </div>
        </div>
    )
}

export default Register
