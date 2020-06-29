import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper'
import { getUserPurchaseList } from './helper/userapicalls'


const UserDashBoard = () => {
    const [purchaseList, setPurchaseList] = useState([])
    const {user, token} = isAutheticated()
    
    
    const getPurchaseList = () => {
        getUserPurchaseList(user._id, token)
        .then(data => {
            if (data.error) {
                console.log("ERROR FOR USERDASH", data.error)
            } else {
                setPurchaseList(data)
            }
        })
    }

    useEffect(() => {
        getPurchaseList() 
    }, [])
    

    return (
        <Base className="container">
            <div className="conatiner">
                <div className="whiteBG mb-3">
                   {purchaseList.length > 0 && purchaseList.length < 2  && (
                       <h4 className="p-4 heading whiteBG">Your order</h4>
                   )}

                   {purchaseList.length > 1 && (
                       <h4 className="p-4 heading whiteBG">Your orders</h4>
                   )} 
                </div>

                <div className="container">
                    { purchaseList.length > 0 ? (
                        purchaseList.map((order, index) => (
                            <div className="whiteBG  row  text-center mb-3 border">
                                    <p className="heading col-sm-6 col-md-3 p-4 border-bottom mb-0" >{index +1}</p>
                                    <p className="heading col-sm-6 col-md-3 p-4 border-bottom mb-0">No of Products: {order.products.length}</p>
                                    <p className="heading col-sm-6 col-md-3 p-4 border-bottom mb-0">Total Amount: {order.amount}</p>
                                    <p className="heading col-sm-6 col-md-3 p-4 border-bottom mb-0">{order.created}</p>
                            </div>
                        ))
                    ) : (<h4 className="p-4 heading whiteBG">You do not have any order yet</h4>)}
                </div>
            </div>
        </Base>
    )
}

export default UserDashBoard; 