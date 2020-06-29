import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Base from '../core/Base';
import {signin, isAutheticated, authenticate} from '../auth/helper'

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    })

    const {email, password, error, loading, didRedirect} = values;
    const {user} = isAutheticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
        .then((data) => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, () => {
                    setValues({...values, 
                    didRedirect: true
                    })
                } )
            }
        }).catch(() => {
            console.log("SigIn fail")
        })
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }   
        if(isAutheticated()){
            return <Redirect to="/" />
        }
    }
 
    const loadingMessge = () => (
        loading && ( <div className="alert alert-info">Loading...</div> )
    )
    
    const errorMessge = () => (
        <div className="alert alert-danger"style={{display: error ? "" : "none"}}>
            {error}
        </div>
    )

    const SignInForm = () => {
        return(
            <div className="row">
                <div className="col-md-5 blueBG text-white text-center px-4 pt-5">
                    <h2>Welcome Back!</h2>
                    <p className="lead">Get access to your Orders, Wishlist and Recommendations</p>
                    <img className="text-center pt-5 mt-2 " src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_dec4bf.png" alt="login" />                    
                </div>

                <div className="col-md-6 mx-auto p-4 text-left">
                <h1 className="text-center mb-3">Login Here</h1>
                    <form>
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

                        <button onClick={onSubmit}
                            className="btn btn- yellowBG btn-block">Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }
 
    return (
        <Base className="container mb-5" >
            {loadingMessge()}
            {errorMessge()}
            {performRedirect()}
            <div className="container whiteBG ">
               {SignInForm()}
            </div>
           
        </Base>
        )

}

export default Signin;
