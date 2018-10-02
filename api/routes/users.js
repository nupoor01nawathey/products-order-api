const express = require('express'),
       router = express.Router();

const UsersController = require('../controllers/users');

router.post('/signup', UsersController.createUser);

router.post('/login', UsersController.loginUser);

router.delete('/:userId', UsersController.deleteUser);

module.exports = router ;

// {
// 	"email": "test1@test.com",
// 	"password": "test"
// }
// {
//   "message": "Auth successful",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwidXNlcklkIjoiNWJiMGZlYTc5YWIyNzUwYzYxZTBhZThjIiwiaWF0IjoxNTM4NDA5ODkxLCJleHAiOjE1Mzg0OTYyOTF9.4uwG8k0pfp9VnzXS_ErsuTFEaayiA0Zp0oL_Cqgc414"
// }