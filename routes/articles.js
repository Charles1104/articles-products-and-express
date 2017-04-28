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
    if(key !== 'title' && key !== 'body' && key !== 'author'){
      return res.render('articles/new', {"message":"Some of the properties you want to edit do not exist or are mispelled"});
    }
  }
  let titleQuery = {title: `${req.params.title}`};
  res.test = titleQuery;

  next();
});

// POST
router.route('/')
  .post((req, res) => {
    articles.db.none('INSERT INTO articles(title, body, author) VALUES($1, $2, $3)', [`${req.body.title}`, `${req.body.body}`, `${req.body.author}`])
      .then(() => {
      console.log("success post");
      })
      .catch(error => {
      console.log("failure post", error);
      });
    res.redirect('/articles/');
  });

// PUT
router.route('/:title')
  .put((req, res) => {
    articles.editArticle(req)
      .then(data => {
        console.log(data);
        res.redirect(303, `/articles/${req.params.title}`);
      });
  });

// DELETE
router.route('/:title')
  .delete((req, res) => {
    articles.deleteArticle(req)
      .then(data => {
        console.log(data);
        res.redirect(303, '/articles/');
      });
  });

// GET
router.route('/')
  .get( (req, res) => {
    articles.getArticles()
      .then(data => {
        let articlesData = {
          listArticles: data,
          message: req.query.message
        };
        res.render('articles/index', articlesData);
      });
  });

router.route('/new')
  .get( (req, res) => {
    res.render('articles/new', req.query);
  });

router.route('/:title')
  .get( (req, res) => {
    articles.getArticle(req.params.title)
      .then(data => {
        console.log(data);
        res.render('articles/article',data);
      });
});

router.route('/:title/edit')
  .get( (req, res) => {
    if(articles.getArticle(req.params.title) === undefined){
      res.render('articles/new',{"message": "Impossible to edit this article. Unknown title"});
    } else{
      res.render('articles/edit', articles.getArticle(req.params.title));
    }
  });

module.exports = router;