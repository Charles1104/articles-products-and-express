/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const products = require('../db/products.js');
const queryString = require('query-string');

const postValidation = ((req, res, next) => {

  let error = {};

  if(!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("price") || !req.body.hasOwnProperty("inventory")){
    error.message = "You need the following properties: 'name', 'price' and 'inventory'";
    return res.redirect(`/products/new?${queryString.stringify(error)}`);
  }

  if(products.getNames().indexOf(req.body.name) !== -1){
    error.message = "Name already exists";
    return res.redirect(`/products/new?${queryString.stringify(error)}`);
  }
  next();
});

const putValidation = ((req, res, next) => {

  let error = {};
  let idQuery = {id: `${req.params.id}`};

  if(products.getIndex(req.params.id) === -1){
    error.message = "This is an unknown ID. Please enter a valid ID";
    return res.redirect(303,`/products/:id/edit?${queryString.stringify(error)}`);
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

  res.test = idQuery;

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
      products.getProduct(req.params.id)[key] = req.body[key];
    }
    res.redirect(303, `/products/:id?${queryString.stringify(res.test)}`);
  });

// DELETE

router.route('/:id')
  .delete(putValidation, (req, res) => {
    products.getProducts().splice(products.getIndex(req.params.id),1);
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
      console.log(products.getProduct(req.params.id));
      res.render('products/product',products.getProduct(req.params.id));
    } else{
      res.render('products/product',products.getProduct(Number(req.query.id)));
    }
});

router.route('/:id/edit')
  .get( (req, res) => {

    console.log(req.query);

    if(req.query.message === undefined){
      res.render('products/edit', products.getProduct(req.params.id));
    } else {
      res.render('products/edit', {"message": `${req.query.message}`, "inventory":"hi", "name": "hi", "price":"hi", inventory: ""});
    }

  });


module.exports = router;