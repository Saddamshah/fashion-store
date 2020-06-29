import React, {Fragment, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAutheticated} from '../auth/helper'

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#ffe500" }
    } else {
        return {color: "#fff"}
    }
}
const Navbar = ({history}) => {
    const [scroll, setScroll] = useState(false)

    window.addEventListener('scroll', () => {
        if(window.pageYOffset > 35) {
            setScroll(true)
        } else {
           setScroll(false)
        }
    })

    return (
        <nav className="navbar navbar-expand-md  blueBG  navbar-dark fixed-top" style={{boxShadow: scroll ? "0px 4px 10px -1px rgba(0,0,0,0.75)" : "none"}} >
          
        <div className="container-fluid heading">
            <Link style={currentTab(history, '/')} className="navbar-brand heading" to="/">Fashion Store</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" >
                    <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link style={currentTab(history, '/allproducts')} className="nav-link mx-2" to="/allproducts">Our Products</Link>
                    </li>
                    
                    {isAutheticated() && isAutheticated().user.role === 0 && (
                        <li className="nav-item">
                            <Link style={currentTab(history, '/user/dashboard')} className="nav-link mx-2" to="/user/dashboard">U. Dashboard</Link>
                        </li>
                    )}

                    {isAutheticated() && isAutheticated().user.role === 1 && (
                        <li className="nav-item">
                            <Link style={currentTab(history, '/admin/dashboard')} className="nav-link mx-2" to="/admin/dashboard">A. Dasboard</Link>
                        </li>
                    )}

                    {!isAutheticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link style={currentTab(history, '/signup')} className="nav-link mx-2" to="/signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={currentTab(history, '/signin')} className="nav-link mx-2" to="/signin">Sign In</Link>
                            </li>
                        </Fragment>
                    )}

                    <li className="nav-item">
                        <Link style={currentTab(history, '/cart')} className="nav-link mx-2" to="/cart">
                        <i className="fa fa-shopping-cart fa-lg"></i> Cart</Link>
                    </li>
                    
                    {isAutheticated() && (
                        <li className="nav-item text-white">
                            <span 
                                className="nav-link mx-2 text-warning"
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    signout(() => {
                                        history.push('/')
                                    })
                                }}
                            >
                                Sigout
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
        
        </nav>    
    )
}

export default withRouter(Navbar);
