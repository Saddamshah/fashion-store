import React, { useState, useEffect } from 'react'
import { loadCart, cartEmpty } from './helper/cartHelper'
import { getmetoken, processPayment } from './helper/paymentHelperB'
import { createOrder } from './helper/orderHelper'
import { isAutheticated } from '../auth/helper'
import DropIn from 'braintree-web-drop-in-react'

const Paymentb = ({products, setReload = f => f, reload = undefined}) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAutheticated() && isAutheticated().user._id
    const token = isAutheticated() && isAutheticated().token
    
    const getToken = (userId, token) => {
        if(userId) {
            getmetoken(userId, token).then(info => {
                console.log("INFORMATION", info)
                if(info.error) {
                    setInfo({...info, error: info.error})
                } else {
                    const clientToken = info.clientToken;
                    setInfo({clientToken})
                }
            })
        }
        
    }

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken !== null  ? (
                    <div className="pt-2">
                        <DropIn 
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-block yellowBG btn-lg" 
                            onClick={onPurchase}>Continue to checkout
                        </button>
                    </div>
                ) : (<h3 className="pt-4 text-center">Please Login </h3>)}
            </div>
        )
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])


    const  onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
             nonce = data.nonce
             const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
             }
             processPayment(userId, token, paymentData).then(response => {
                setInfo({...info, success: response.success, loading: false})
                console.log("PAYMENT SUCCESS");
               
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    created: new Date().toDateString()
                };
                createOrder(userId, token, orderData);
                cartEmpty(() => {
        }); 
                setReload(!reload);
            })
            .catch(error => {
                console.log("ERROR", error)
                setInfo({loading: false, success: false})
                console.log("PAYMENT FAIL");
            })
        })
    }


    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price
        })

        return amount;
    }

    const loadAllProductsList = products  => {
        return (
            <div className="">  
                <div class=" order-md-2 mb-4">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="heading text-muted">Your cart summary</span>
                        <span class="badge badge-secondary badge-pill">{products.length}</span>
                    </h4>
                    <ul class="list-group mb-3">
                {products.map((product, index) => {
                    return ( 
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">{product.name}</h6>
                            <small class="text-muted">{product.description}</small>
                        </div>
                        <span class="text-muted">₹{product.price}</span>
                        </li>
                    ) 
                })}
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Total (INR)</span>
                            <strong>₹{getAmount()}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="row justify-content-around">
                <div className="col-sm-12 col-md-6 pt-4 mb-2 whiteBG" style={{margin: "0 0 0 0"}} >
                   {loadAllProductsList(products)}
                </div>

                <div className="col-sm-12 col-md-5 mb-2 whiteBG pb-4" >
                    {showbtdropIn()}    
                </div>
            </div>
            
        </div>
    )
}



export default Paymentb
