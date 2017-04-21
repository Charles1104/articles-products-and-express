/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const products = require('../db/products.js');
const queryString = require('query-string');

const postValidation = ((req, res, next) => {

  let productsListName = products.getProducts().map(function(x){return x.name;});
  let error = {};

  if(!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("price") || !req.body.hasOwnProperty("inventory")){
    error.message = "You need the following properties: 'name', 'price' and 'inventory'";
    return res.redirect(`/products/new?${queryString.stringify(error)}`);
  }
  if(productsListName.indexOf(req.body.name) !== -1){
    error.message = "Name already exists";
    return res.redirect(`/products/new?${queryString.stringify(error)}`);
  }
  next();
});

const putValidation = ((req, res, next) => {

  let error = {};
  let productsListId = products.getProducts().map(function(x){return x.id;});

  if(productsListId.indexOf(Number(req.params.id)) === -1){

    console.log("test1");

    error.message = "This is an unknown ID. Please enter a valid ID";
    return res.redirect(`/products/new?${queryString.stringify(error)}`);
  }

  // else {
  //   res.productToEdit = products.getProducts()[productsListId.indexOf(req.params.id)];
  // }

  // for(var key in req.body){
  //   if(key !== 'id' && key !== 'name' && key !== 'inventory' && key !== 'price'){
  //     error.message = "Some of the properties you want to edit do not exist or are mispelled";
  //     return res.redirect(`/products/new?${queryString.stringify(error)}`);
  //   }
  // }
  next();
});

router.route('/')
  .post(postValidation, (req, res) => {
      products.registerProduct(req.body);
      res.redirect('/products/index');
  });

router.route('/:id')
  .put(putValidation, (req, res) => {
    // for (var key in req.body){
    //   res.productToEdit[key] = req.body[key];
    // }
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
    console.log("test2");
    res.render('products/new', req.query);
  });


router.delete( (req, res) => {
    if(req.body.hasOwnProperty("name")){
      router.route('/products/new');
    } else{
      router.route('/products/:id/edit');
    }
  });

module.exports = router;