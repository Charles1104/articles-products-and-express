/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const products = require('../db/products.js');
const queryStrng = require('query-string');

const postValidation = ((req, res, next) => {

  let productsList = products.getProducts().map(function(x){return x.name;});
  let errorMessage = "";

  if(!req.body.hasOwnProperty("name") && !req.body.hasOwnProperty("price") && !req.body.hasOwnProperty("inventory")){
    if(productsList.indexOf(req.body.name) !== -1){
      errorMessage = "Name already exists";
      console.log(queryString.stringify(errorMessage));
      res.redirect('/products/new');
    } else {
      errorMessage = "You need the following properties: 'name', 'price' and 'inventory'";
      res.redirect('/products/new');
    }
  }
  next();
});

router.route('/')
  .post(postValidation, (req, res) => {
      products.registerProduct(req.body);
      res.redirect('/products/index');
  });

router.route('/index')
  .get( (req, res) => {

    let productsData = {
      listProducts: products.getProducts()
    };

    res.render('products/index', productsData);
  });

router.route('/new')
  .get( (req, res) => {
    console.log(req.query);
    res.render('home');
  });

router.route('/:id')
  .put( (req, res) => {
    if(req.body.hasOwnProperty("name")){
      router.route('/products/new');
    } else{
      router.route('/products/:id/edit');
    }
  })

  .delete( (req, res) => {
    if(req.body.hasOwnProperty("name")){
      router.route('/products/new');
    } else{
      router.route('/products/:id/edit');
    }
  });

module.exports = router;