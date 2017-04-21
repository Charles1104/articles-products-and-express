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
  let query = {};
  let productsListId = products.getProducts().map(function(x){return x.id;});

  if(productsListId.indexOf(Number(req.params.id)) === -1){
    error.message = "This is an unknown ID. Please enter a valid ID";
    return res.redirect(303,`/products/:id/edit?${queryString.stringify(error)}`);
  }

  else {
    res.index = productsListId.indexOf(Number(req.params.id));
    res.productToEdit = products.getProducts()[productsListId.indexOf(Number(req.params.id))];
    query.id = req.params.id;
    res.idQuery = query;
  }

  for(var key in req.body){
    if(key !== 'id' && key !== 'name' && key !== 'inventory' && key !== 'price'){
      error.message = "Some of the properties you want to edit do not exist or are mispelled";
      return res.redirect(303,`/products/:id/edit?${queryString.stringify(error)}`);
    }
    if(key === "price" || key === "inventory"){
      req.body[key] = Number(req.body[key]);
    }
  }
  next();
});

// POST

router.route('/')
  .post(postValidation, (req, res) => {
      products.registerProduct(req.body);
      res.redirect('/products/');
  });

// PUT

router.route('/:id')
  .put(putValidation, (req, res) => {
    for (var key in req.body){
      res.productToEdit[key] = req.body[key];
    }
    res.redirect(303, `/products/:id?${queryString.stringify(res.idQuery)}`);
  });

// DELETE

router.route('/:id')
  .delete(putValidation, (req, res) => {
    products.getProducts().splice(res.index,1);
    res.redirect('/products/');
  });

// GET

router.route('/')
  .get( (req, res) => {
    let productsData = {
      listProducts: products.getProducts()
    };
    res.render('products/index', productsData);
  });

router.route('/new')
  .get( (req, res) => {
    res.render('products/new', req.query);
  });

router.route('/:id')
.get( (req, res) => {

  if(isNaN(Number(req.query.id))){
    res.render('products/product',products.getProducts()[products.getProducts().map(function(x){return x.id;}).indexOf(Number(req.params.id))]);
  } else{
  res.render('products/product',products.getProducts()[products.getProducts().map(function(x){return x.id;}).indexOf(Number(req.query.id))]);
  }

});

router.route('/:id/edit')
  .get( (req, res) => {

    console.log(req.query.message);
    if(req.query.message === undefined){
      console.log( products.getProducts()[products.getProducts().map(function(x){return x.id;}).indexOf(Number(req.params.id))]);
      res.render('products/edit', products.getProducts()[products.getProducts().map(function(x){return x.id;}).indexOf(Number(req.params.id))]);
    } else {
      req.query.id = "Enter a valid ID";
      req.query.name = "To be displayed after entering an ID";
      req.query.price = "To be displayed after entering an ID";
      req.query.inventory = "To be displayed after entering an ID";
      console.log(req.query);
      res.render('products/edit', req.query);
    }

  });



module.exports = router;