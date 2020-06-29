import React from 'react'
import { API } from '../../backend'


const ImageHelper = ({product}) => {
  const imageUrl = product 
        ? `${API}/product/photo/${product._id}` 
        : "https://rukminim1.flixcart.com/image/150/150/jxhv1jk0/t-shirt/r/h/g/xxl-am-1020mdb-aelomart-original-imafhxyzuhtky3zy.jpeg?q=70"
    return (
          <img
            src={imageUrl}
            alt="photo"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mx-3 hovered"
          />
    )
}

export default ImageHelper
