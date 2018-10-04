# products-order-api
products and order RESTful API using node express and mongoose

localhost:3000/users/signup
POST route
Headers Content-Type: application/json
Body 
{
	"email": "test2@test.com",
	"password": "test"
}


localhost:3000/users/login
POST route
Headers Content-Type: application/json
Body 
{
    "email": "your_email",
    "password": "your_password"
}

O/P:
{
    "message": "Auth successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQHRlc3QuY29tIiwidXNlcklkIjoiNWJiMzhlMTNiMjEyMjcyNmQ3ZDI3NDc2IiwiaWF0IjoxNTM4NDk0MDY5LCJleHAiOjE1Mzg1ODA0Njl9.4Esf1XhyEoupNPTV-mMrPlDDH6IL0mC8kRoQU1PU8zM"
}


localhost:3000/users
DELETE route
Headers Content-Type: application/json
Authorization Bearer <your_token_after_user_login>
Authorization Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQHRlc3QuY29tIiwidXNlcklkIjoiNWJiMzhlMTNiMjEyMjcyNmQ3ZDI3NDc2IiwiaWF0IjoxNTM4NDk0MDY5LCJleHAiOjE1Mzg1ODA0Njl9.4Esf1XhyEoupNPTV-mMrPlDDH6IL0mC8kRoQU1PU8zM"

-----------------------------------------------------------------------------------------------

localhost:3000/products/
GET route
Headers Content-Type: application/json


localhost:3000/products/5bb0c28aa5b28e078dbf1343
GET route
Headers Content-Type: application/json
Authorization Bearer <your_token_after_user_login>


localhost:3000/products/
POST route
Headers Authorization Bearer <your_token_after_user_login>
Body form-data
name price and productImg as key value pairs


localhost:3000/products/5bb0c28aa5b28e078dbf1343
PATCH route
Headers Content-Type: application/json
Authorization Bearer <your_token_after_user_login>
Body: pass either price or name or productImg
{
    "price": "updated_price",
    "name": "updated_name",
    "productImg": "updated_image"
}


localhost:3000/products/5bb4c72894a53f03e201ccaf
DELETE route
Authorization Bearer <your_token_after_user_login>

-------------------------------------------------------------------------------------------
localhost:3000/orders/
GET route
Headers Content-Type: application/json
Authorization Bearer <your_token_after_user_login>


localhost:3000/orders/
POST route
Headers Content-Type: application/json
Authorization Bearer <your_token_after_user_login>

Body
{
	"productId": "5bb0ddff055ef7092a9120b3",
	"quantity" : "2"
}


localhost:3000/orders/5bb4cb42d7af15040533d09e
GET route
Headers Content-Type: application/json
Authorization Bearer <your_token_after_user_login>


localhost:3000/orders/5bb4cb1fd7af15040533d09d
DELETE route
Headers Content-Type: application/json
Authorization Bearer <your_token_after_user_logins>

-------------------------------------------------------------------------------------------

package.json

  "scripts": {
    "test": "mocha",
    "test-watch": " nodemon --exec \" npm test \" ",
    "start": "nodemon server.js"
  },

"devDependencies": {
    "chai": "^4.2.0",
    "expect": "^23.6.0",
    "mocha": "^5.2.0",
    "supertest": "^3.3.0"
  }

Run using command:  npm test


-------------------------------------------------------------------------------------------
