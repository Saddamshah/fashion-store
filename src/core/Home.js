import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'
import { getCategories } from '../admin/helper/adminapicall'
import { Link } from 'react-router-dom'


export default function Home() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [categories, setCategories] = useState([]) 

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

    useEffect(() => {
        loadAllProducts()
        loadAllCategories()
    }, [])

    return (
        <Base className="container-fluid" >
            {categories.map((cate, i) => {
                return (
                <div className="whiteBG">
                    <div key={i} className="container-fluid  pt-4 pb-1 px-4  my-3">
                        <h2 className="text-center heading text-capitalize pb-2">{cate.name}</h2>
                        <hr></hr>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="heading">Offers on {cate.name}</h5>
                            <Link to="/allproducts" className="btn btn-primary btn-sm" style={{fontSize: "16px"}}>View More</Link>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="container-fluid ">
                        <div className="row">
                            { products.map((product, index) => {
                                return (
                                    <>
                                    {product.category ? (
                                        cate.name === product.category.name ? (
                                            <div key={index} className="mx-auto">
                                                <Card product={product}/>
                                            </div> 
                                        ) : ('')
                                    ) : ""}
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
                )
            })}
        </Base>
    )
}

