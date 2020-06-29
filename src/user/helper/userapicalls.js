const { API } = require("../../backend");

export const getUserPurchaseList = (userId, token) => {
    return fetch(`${API}/order/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json()).catch(err => console.log(err))
}