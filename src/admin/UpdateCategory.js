import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import {isAutheticated} from '../auth/helper'
import { updateCategory, getCategory, getCategories } from './helper/adminapicall'

const  UpdateCategory = ({match}) =>  {

    const [name, setName] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [categories, setCategories] = useState([])

    const {user, token} = isAutheticated();

    const goBack = () => (
        <div className="mt-5">
            <Link 
            className="btn btn-sm blueBG text-white mb-3 px-3" to="/admin/categories">
                Manage Categories
            </Link>
        </div>
    )

    const loadAllCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)      
            }
        })
    }
    
    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                setError(true)
            } else {
                console.log(data)
                setError(false)
                setName(data.name)
            }
        })
    }

    useEffect(() => {
     preload(match.params.categoryId)
     loadAllCategories()
    }, [])

    const AllCategories = () => {
        return (
            <div className="text-center pb-3">
                <div className="heading pt-4 ">
                    <h4>All Categories</h4>
                </div>
               
                {categories.map((cate, index) => (

                <div>
                     <hr></hr>
                    <li className="nav-link text-dark ">{cate.name}</li>
                </div>

                ))}
            </div>
        )
    }

    const handleChange = (event) => {
        setError("")
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setError("")
        setSuccess(false)

        //Backend Call
        updateCategory(match.params.categoryId ,user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(true)
            } else {
                setError("")
                setSuccess(true)
                setName("")
                loadAllCategories()
            }
        })
    }

    const successMessage = () => {
        if(success){
            return <h4 className="alert alert-success mt-3">Category updated Successfully.</h4>       
        }
    }

    const errorMessage = () => {
        if(error){
           return <h4 className="alert alert-warning mt-3">Fail to  update Category.</h4>       
        } 
    }

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Update Your Category</p>
                <input className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For Ex. Summar"
                />
                <button 
                onClick={onSubmit}
                className="btn btn- yellowBG btn-block">Update Category</button>
            </div>
        </form>
    )

    return (
        <Base className="container ">
           <div className="row justify-content-around ">
                <div className="container col-md-4 col-sm-12 ">
                    <div className="whiteBG mb-4">
                        {AllCategories()}
                    </div>
                </div>

                <div className="container col-md-8 col-sm-12 "> 
                        {successMessage()}
                        {errorMessage()}
                    <div className="whiteBG p-5 mb-4" >
                        {myCategoryForm()} 
                        {goBack()}
                    </div>
                </div>
           </div>
       </Base>

    )
}


export default UpdateCategory;
