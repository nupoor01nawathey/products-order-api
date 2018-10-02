const mongoose = require('mongoose'),
       bcrypt  = require('bcrypt'),
       jwt     = require('jsonwebtoken');

const User = require('../models/users');

exports.createUser = (req, res, next) => {
    User.find({email: req.body.email})
    .then(user => {
      if(user.length >= 1) { // if user not found then returns array hence check length
        return res.status(409).json({ // send conflict http error code for existing user
          message: 'Email already exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => { // save hash password in db
          if(err) {
            return res.status(500).json({
              error: err
            });
          } else {
            
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });  
             user.save()
             .then(result => {
               res.status(200).json({
                 message: 'User created successfully',
                 user: result
               });
             })
             .catch(err => {
                res.status(500).json({
                  error: err
               });
             }); 
          }
        });
      }
    });
  }


  exports.loginUser = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user =>{
      if(user.length > 1) {
        return res.status(401).json({
          messge: 'Auth failed'
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(err) {
          return res.status(401).json({ // error in email 
            messge: 'Auth failed'
          });
        }
        if(result) {
          const token = jwt.sign({
            email: user.email,
            userId: user._id
          }, 
          process.env.JWT_KEY,
          {
            expiresIn: "24h"
          }
          );
          res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        } else {
          res.status(401).json({ // error in password
            messge: 'Auth failed'
          });
        }
      });
    })
    .catch(err => { 
      res.status(500).json({
      error: err
      });
    });
  }


  exports.deleteUser = (req, res, next) => {
    User.findByIdAndRemove({_id: req.params.userId})
    .then(result => {
      res.status(200).json({
        message: 'User deleted successfully',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }