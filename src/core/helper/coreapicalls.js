const { API } = require("../../backend");

//get all the products
export const getProducts = () => {
    return fetch(`${API}/products`, {method: "GET"})
    .then(response => response.json()).catch(err => console.log(err))
}