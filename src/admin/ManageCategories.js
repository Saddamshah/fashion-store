import React, { useState, useEffect } from "react"
import Base from '../core/Base';
import { Link } from "react-router-dom"
import { isAutheticated } from "../auth/helper";
import { getCategories, deleteCategory } from "./helper/adminapicall";

 
const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const {user, token} = isAutheticated();
    
    const preload = () => {
        getCategories().then(data => {
            if (data.error) {
              console.log(data.error);
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisCategory = (categoryId) => {
        let approval =  prompt(`Please type "DELETE" if you want to delete Category ? `)
        if(approval == "DELETE") {
            deleteCategory(categoryId, user._id, token).then(data => {
                if(data.error){
                    console.log(data.error)
                } else {
                    preload()
                }
            })
        }
    }

    return (
        <Base className="container">
            <div className="">
                <div className=" whiteBG container-fluid  py-4  px-4  my-3 border-bottom">
                    <h2 className="text-center heading text-capitalize pb-2">
                        Manage All Categories
                    </h2>
                    <hr></hr>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="heading">No of categories {categories.length}  </h5>
                        <Link to="/admin/create/category" 
                            className="btn btn-primary btn-sm" style={{fontSize: "16px"}}>Create Category
                        </Link>
                    </div>
                </div>

                <div className="container ">
                    <div className="row justify-content-between">
                        { categories.map((category, index) => {
                            return (
                                <>
                                <div key={index} className="border col-md-5 col-sm-12 whiteBG p-4 text-center mb-3 ml-1">
                                    <h3 className="mb-3 heading">{category.name}</h3>

                                    <Link className="btn yellowBG text-white px-3 " to={`/admin/category/update/${category._id}`}>
                                        <span className="">Update</span>
                                    </Link>

                                    <button onClick={() => {deleteThisCategory(category._id)}}  className="btn orangeBG text-white px-3">
                                        Delete
                                    </button>
                                    
                                </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div> 
       </Base>

    )
}

export default ManageCategories;

