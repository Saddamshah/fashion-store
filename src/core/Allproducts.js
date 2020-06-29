import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'


export default function AllProducts() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    
    const loadAllProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProducts(data)
            }
        })
    }


    useEffect(() => {
        loadAllProducts()
    }, [])

    return (
        <Base className="container-fluid" >
           
               <div className="whiteBG">
                    <div className="container-fluid  pt-4 pb-1 px-4  my-3">
                        <h2 className="text-center heading text-capitalize pb-2">All of Our Products</h2>
                        <h5 className="heading text-center pb-3">Total {products.length}</h5>
                        <hr></hr>
                    </div>
                    <div className="container-fluid ">
                        <div className="row">
                        { products.map((product, index) => {
                            return (
                                <>
                                    <div key={index} className="mx-auto mb-2">
                                        <Card product={product}/>
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

