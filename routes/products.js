/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const products = require('../db/products.js');
const queryString = require('query-string');

const postValidation = ((req, res, next) => {

  if(!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("price") || !req.body.hasOwnProperty("inventory")){
    res.render('products/new',{"message": "You need the following properties: 'name', 'price' and 'inventory'"});
  } else if(products.getNames().indexOf(req.body.name) !== -1){
    res.render('products/new',{"message": "Name already exists"});
  } else{
  next();
}
});

const putValidation = ((req, res, next) => {

  let idQuery = {id: `${req.params.id}`};

  if(products.getIndex(req.params.id) === -1){
    res.render('products/new',{"message": "Impossible to edit this product. Unknown ID"});
  }
  for(var key in req.body){
    if(key !== 'id' && key !== 'name' && key !== 'inventory' && key !== 'price'){
      return res.end("Some of the properties you want to edit do not exist or are mispelled");
    } else if(key === "price" || key === "inventory"){
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
    products.editProduct(req);
    res.redirect(303, `/products/:id?${queryString.stringify(res.test)}`);
  });

// DELETE
router.route('/:id')
  .delete(putValidation, (req, res) => {
    products.deleteProduct(req.params.id);
    res.redirect(`/products/?message=element%20with%20id%20${req.params.id}%20has%20been%20deleted`);
  });

// GET
router.route('/')
  .get( (req, res) => {
    let productsData = {
      listProducts: products.getProducts(),
      message: req.query.message
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
    if(products.getProduct(req.params.id) === undefined){
      res.render('products/new',{"message": "Impossible to edit this product. Unknown ID"});
    } else{
      res.render('products/edit', products.getProduct(req.params.id));
    }
  });

module.exports = router;