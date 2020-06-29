import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import {isAutheticated} from '../auth/helper'
import {Link} from 'react-router-dom'
import { getProducts } from '../core/helper/coreapicalls'
import { getCategories, getAllOrders } from '../admin/helper/adminapicall'


const AdminDashBoard = () => {
    const {user, token} = isAutheticated();

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [categories, setCategories] = useState([])
    const [orders, setOrders] = useState([])
    
    const loadAllProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const loadAllCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)      
            }
        })
    }

    const allOrders = () => {
        getAllOrders(user._id, token).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setOrders(data)      
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
        loadAllCategories()
        allOrders()
    }, [])

    const AdminLeftSide = () => {
        return (
            <div className="text-center ">
                <div className="heading pt-4 ">
                    <h4>Admin Navigation</h4>
                </div>
                <hr></hr>
                <div>
                    <Link to="/admin/create/category" 
                        className="nav-link text-dark">Create Categories
                    </Link>
                    <hr></hr>

                    <Link to="/admin/categories" 
                        className="nav-link text-dark">Manage Categories
                    </Link>
                    <hr></hr>

                    <Link to="/admin/create/product" 
                        className="nav-link text-dark ">Create Product
                    </Link>
                    <hr></hr>

                    <Link to="/admin/products" 
                        className="nav-link text-dark ">Manage Products
                    </Link>
                </div>
            </div>
        )
    }
    
    const AdminRightSide = () => {
        return (
            <div className="text-center">
                 <div className="row justify-content-around whiteBG">
                    <h3 className="pt-4 pb-3 heading">Admin Information</h3>
                </div>

                <div className="row justify-content-around">
                    <div className="col-md-5 col-sm-12 p-4 whiteBG mt-3  ">
                        <h5 className="font-weight-normal">No of Products : {products.length}</h5>
                    </div>
                    
                    <div className="col-md-6 col-sm-12 p-4 whiteBG mt-3  ">
                        <h5 className="font-weight-normal">No of Categories : {categories.length}</h5>
                    </div>

                    <div className="col-md-10 col-sm-12 p-4  whiteBG mt-3  ">
                        <h5 className="font-weight-normal mb-0">No of total Orders: {orders.length}</h5>
                    </div>

                    <div className="col-md-4 col-sm-12 p-4  whiteBG mt-3 ">
                        <h5 className="font-weight-normal mb-0"> Name: {user.name}</h5>
                    </div>

                    <div className="col-md-7 col-sm-12 p-4  whiteBG mt-3 ">
                        <h5 className="font-weight-normal mb-0"> Email Id: {user.email}</h5>
                    </div>
                    
                </div>
            </div>
        )
    }

    return (
        <Base className="container-fluid ">
            <div className="container-fluid mb-5 px-4 pb-4 ">
                <div className="row">
                    <div className="col-md-3 col-sm-12  whiteBG" 
                        style={{borderRight: "15px solid #f1f3f6", borderTop: "15px solid #f1f3f6"}}>
                        {AdminLeftSide()}
                    </div>
                    <div className="col-md-9 col-sm-12 " 
                        style={{borderRight: "15px solid #f1f3f6", borderTop: "15px solid #f1f3f6"}} >
                        {AdminRightSide()}
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default AdminDashBoard;
