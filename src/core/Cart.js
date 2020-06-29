import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import Paymentb from './Paymentb'



const  Cart = () =>  {
    const [products, setProducts] = useState([]) 
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart()) 
    }, [reload])

    const loadAllProducts = products => {
        return (
            <div className="row">
                {products.map((product, index) => {
                    return (
                        <div key={index} className=" mx-auto">
                            <Card 
                                product={product}
                                addtoCart={false}
                                removeFromCart={true}
                                setReload={setReload}
                                reload={reload}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price
        })

        return amount;
    }


    return (
        <Base className="container">
            <div className="container">
                    {products.length  ? (
                         <> 
                            <div className="container-fluid">
                                <Paymentb products={products} setReload={setReload} />
                            </div>

                            <div className="whiteBG">
                                <hr />
                                {loadAllProducts(products)}
                            </div>
                        </>
                    ) : <h4 className="p-4 heading whiteBG">Your Cart In Empty </h4> }
            </div>
        </Base>
    )
}

export default Cart;