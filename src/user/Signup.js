import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Base from '../core/Base';
import {signup} from '../auth/helper'

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        })
        .catch((err) => {
            console.log("Error in signup", err)
        })
    }
    
    const SignUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-5 blueBG text-white text-center px-4 pt-5">
                    <h2>Looks like you're new here!</h2>
                    <p className="lead">sign up with your details to get started</p>
                    <img className="text-center pt-5 mt-2 " src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_dec4bf.png" alt="" />                    
                </div>
                
                <div className="col-md-6 mx-auto p-4 text-left">
                    <h1 className="text-center mb-3">Sign up here</h1>
                    <form>
                        <div className="form-group">
                            <label className="lead">Name:</label>
                            <input className="form-control"  
                            value={name}
                            onChange={handleChange('name')} 
                            type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lead">Email:</label>
                            <input className="form-control"  
                            onChange={handleChange('email')}
                            value={email} 
                            type="email" />
                        </div>

                        <div className="form-group">
                            <label className="lead">Password:</label>
                            <input className="form-control"  
                            onChange={handleChange('password')} 
                            value={password}
                            type="password" />
                        </div>

                        <button className="btn yellowBG btn-block " type="submit" 
                            onClick={onSubmit}>Create Account
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessge = () => (
        <div className="alert alert-success" style={{display: success ? "" : "none"}} >
            Account created successfully. Please <Link to="/signin" className="alert-link"> Login Here</Link>
        </div>   
    )

    const errorMessge = () => (
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}> 
            {error}
        </div>
    )

    return (
        <Base className="container mb-5" >
            {successMessge()}
            {errorMessge()}
            <div className="container whiteBG">
                {SignUpForm()} 
            </div>
        </Base>
    )
}

export default Signup;
