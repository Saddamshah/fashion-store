import React, { useState, useEffect } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemToCart } from './helper/cartHelper';

const Card = ({
  product, 
  addtoCart = true, 
  removeFromCart = false,
  setReload = f => f,
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setcount] = useState(product.count)
  const cartTittle = product ? product.name : "A default Tittle"
  const cartDescription = product  ? product.description : "A default description come here" 
  const cartPrice = product ? product.price : "DEFAULT"

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true))
  }

  const getARedirect = (redirect) => {
    if (redirect) {
     return <Redirect to="/cart" />
    }
  }

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button onClick={addToCart}
          className="btn  orangeBG text-white mt-2 mb-2 "
          style={{fontSize: "16px", padding: "6px 20px"}}
        >
          Add to Cart
        </button>
      )
    )
  }

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button onClick={() => {
          removeItemToCart(product._id);
          setReload(!reload)
        }}
        className="btn  btn-danger mt-2 mb-2"
        style={{fontSize: "16px", padding: "6px auto"}}
        >
          Remove from cart
        </button>
      )
    )
  }

  return (
    <div className="text-center" style={{maxWidth: "178px", padding: "22px 10px"}}>
      <div className="">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <div className="productTitle text-wrap" style={{marginTop: "15px"}}>
          {cartTittle}
        </div>
        <div className="heading text-center" style={{color:"rgb(56, 142, 60)", marginTop: "8px"}}> 
          Under ₹{cartPrice}
        </div>
        <div className="productTitle text-wrap" style={{opacity: "0.6", marginTop: "7px"}}>
          {cartDescription}
        </div>
        <div className="row  gotocart">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};


export default Card;