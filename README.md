### E-commerce Website


### `Technical Overview`
1. API Web application where Backend is created on Node server and frontend is built on react.js
2. Full Authentication system using JWT, where each signup data is stored on MongoDB database using mongo atlas.
3. Once the user logins, we store their details in the local storage which includes user Id, email id, and name.
4. No password is strored in the browser. It will only be stored in the database after encryption, using crypto and UUID.
5. The user Model has purchase array, where every product purchased by the user will be stored on the user model
6. Product Model stores every product data, and it also stores the reference id of categories the product belongs to.
7. Every Image will be stored in a binary format (Buffer data) using formidable.
9. For Payment, Braintree DropUI is used. Every order detail is stored in the Order model.
10. Every user has a role 0 by default whereas the role of the admin is one. Below is the list of the changes that the admin can do:

view all the orders,
create, update & delete all categories.
create,update & delete all products.

 `Frontend Technologies`
1. HTML 5
2. CSS  3
3. bootstrap 4
4. JavaScript ES
5. React.js

`Backend Technologies`
1. Node.js
2. Express.js
3. MongoDB
4. JWT

### `Non-technical Overview`

1. A full fledged E-commerce Web Application which has 13 unique pages including two dashboards and one payment gateway.
2. An online E-commerce store where users can view all the products that are differentiated by their categories.
3. Users can add/remove multiple products in/from their carts.
4. On the cart page, users will be able to see the list of the selected products and their details.
5. Users will also be able to do swift transactions using NetBanking, or any domestic or international cards. Eg: VISA Master American Express.
6. All the orders made by the users will be enlisted on their dashboards.
7. Without login, he won't be able to initiate any transaction but can add/remove products in/from their carts.

### Payment details
Card No : 378282246310005
Card Type : American Express
Expiration Date: 12 / 22

### Admin Access
Email Id: admin@admin.com
Password: 12345

### Website URL : https://fashionstoreproject.netlify.app/
