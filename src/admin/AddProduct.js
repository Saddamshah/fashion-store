import React,{useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getCategories, createProduct } from './helper/adminapicall';
import { isAutheticated } from '../auth/helper';


const AddProduct = () => {

    const {user, token} = isAutheticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        formData: ""
    });

    const {
        name, 
        description, 
        price, 
        stock, 
        photo, 
        categories, 
        category, 
        loading, 
        error, 
        createdProduct, 
        formData
    } = values
 
    const preload = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data, formData: new FormData()})
                
            }
        })
    }

    useEffect(() => {
        preload()
    },[])
    

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:"", loading: true})

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values, 
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    createdProduct: data.name,
                    loading: false,
                    error: ""
                })
            }
        })
    }

    const successMessage = () => (
        <div 
            className="alert alert-success mt-3"
            style={{display: createdProduct ? "" : "none"}}
        >
            <h4>{createdProduct} created successfully.</h4>
        </div>
    )

    const errorMessage = () => (
        <div 
            className="alert alert-danger mt-3"
            style={{display: error ? "" : "none"}}
        >
            <h4>{error}</h4>
        </div>
    )

    const loadingMessge = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <p>Loading...</p>
                </div>
            )
        )
    }

    const goBack = () => (
      <div className="mt-5">
          <Link 
          className="btn btn-sm blueBG text-white mb-3 px-3" to="/admin/products">
              Manage Products
          </Link>
      </div>
    )

    const createProductForm = () => (
        <form >
          <span>Product photo</span>
          <div className="form-group">
            <label className="btn btn-block blueBG text-white">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              className="form-control"
              maxlength="19"
              placeholder="Description maxlength 19"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select Category</option> 
              {categories && (
                  categories.map((cate, index) => (
                  <option key={index} value={cate._id}>{cate.name}</option>
                   
                  ))
              )}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn  yellowBG btn-block mb-3">
            Create Product
          </button>
        </form>
      );

    return (
        <Base container="container">  
          <div className="container "> 
                {successMessage()}
                {errorMessage()}
                {loadingMessge()}
              <div className="whiteBG p-5 mb-4" >
                  {createProductForm()}   
                  {goBack()}
              </div>
          </div>
        </Base>
    )
}

export default AddProduct;