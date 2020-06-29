import React, { useState, useEffect } from "react"
import Base from '../core/Base'
import { Link } from "react-router-dom"
import { isAutheticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const {user, token} = isAutheticated();
    
    const preload = () => {
        getProducts().then(data => {
            if (data.error) {
              console.log(data.error);
            } else {
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

   
    const deleteThisProduct = productId => {
        let approval =  prompt(`Please type "DELETE" if you want to delete Product ? `)
        if(approval == "DELETE") {
            deleteProduct(productId, user._id, token).then(data => {
                if (data.error) {
                    console.log(data.error);
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
                        Manage All Products
                    </h2>
                    <hr></hr>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="heading">No of Products {products.length}  </h5>
                        <Link to="/admin/create/product" 
                            className="btn btn-primary btn-sm" style={{fontSize: "16px"}}>Create Product
                        </Link>
                    </div>
                </div>

                <div className="container ">
                    <div className="row justify-content-between">
                        {products.map((product, index) => {
                            return (
                                <>
                                <div key={index} className="border col-md-5 col-sm-12 whiteBG p-4 text-center mb-3 ml-1">
                                    <h3 className="mb-3 heading">{product.name}</h3>

                                    <Link className="btn yellowBG text-white px-3 " to={`/admin/product/update/${product._id}`}>
                                        <span className="">Update</span>
                                    </Link>

                                    <button onClick={() => { deleteThisProduct(product._id)}}  className="btn orangeBG text-white px-3">
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


export default ManageProducts;