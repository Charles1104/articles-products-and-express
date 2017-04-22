/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const articles = require('../db/articles.js');
const queryString = require('query-string');

const postValidation = ((req, res, next) => {

  if(!req.body.hasOwnProperty("title") || !req.body.hasOwnProperty("body") || !req.body.hasOwnProperty("author")){
    res.render('articles/new',{"message": "You need the following properties: 'title', 'body' and 'author'"});
  } else if(articles.getTitles().indexOf(req.body.title) !== -1){
    res.render('articles/new',{"message": "Title already exists"});
  } else{
  next();
}
});

const putValidation = ((req, res, next) => {

  if(articles.getIndex(req.params.title) === -1){
    return res.render('articles/new',{"message": "Impossible to edit this article. Unknown title"});
  }
  for(var key in req.body){
    if(key !== 'title' && key !== 'name' && key !== 'inventory' && key !== 'price'){
      return res.end("Some of the properties you want to edit do not exist or are mispelled");
    }
  }
  let titleQuery = {title: `${req.params.title}`};
  res.test = titleQuery;

  next();
});

// POST
router.route('/')
  .post(postValidation, (req, res) => {
    articles.registerArticle(req.body);
    res.redirect('/articles/');
  });

// PUT
router.route('/:title')
  .put(putValidation, (req, res) => {
    articles.editArticle(req);
    res.redirect(303, `/articles/:title?${queryString.stringify(res.test)}`);
  });

// DELETE
router.route('/:title')
  .delete(putValidation, (req, res) => {
    articles.deleteArticle(req.params.title);
    res.redirect(`/articles/?message=element%20with%20title%20${req.params.title}%20has%20been%20deleted`);
  });

// GET
router.route('/')
  .get( (req, res) => {
    let articlesData = {
      listArticles: articles.getArticles(),
      message: req.query.message
    };
    res.render('articles/index', articlesData);
  });

router.route('/new')
  .get( (req, res) => {
    res.render('articles/new', req.query);
  });

router.route('/:title')
  .get( (req, res) => {
    if(isNaN(Number(req.query.title))){
      res.render('articles/article',articles.getArticle(req.params.title));
    } else{
      res.render('articles/article',articles.getArticle(Number(req.query.title)));
    }
});

router.route('/:title/edit')
  .get( (req, res) => {
    if(articles.getArticle(req.params.title) === undefined){
      res.render('articles/new',{"message": "Impossible to edit this article. Unknown title"});
    } else{
      console.log(articles.getArticle(req.params.title));
      res.render('articles/edit', articles.getArticle(req.params.title));
    }
  });

module.exports = router;