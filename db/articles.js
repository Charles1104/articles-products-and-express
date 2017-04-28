/*jshint esversion: 6 */
var pgp = require('pg-promise')();

module.exports = (function(){

  var connection = {
  host: 'localhost',
  port: 5432,
  database: 'articles_products',
  user: 'article',
  password: 'toto'
  };

  var db = pgp(connection);

  function getArticles(){
   return db.any('SELECT * FROM articles')
      .catch(function(error) {
        console.log('failure database get articles/');
      });
  }

  function getArticle(string){
    return db.one(`SELECT * FROM articles WHERE title = '${string}'`)
      .catch(function(error) {
        console.log('This article does not exist');
      });
  }

  function registerArticle(req){
    return db.none('INSERT INTO articles(title, body, author) VALUES($1, $2, $3)', [req.body.title, req.body.body, req.body.author])
      .then(() => {
      console.log("success post");
      })
      .catch(error => {
      console.log("failure database post", error);
      });
  }

  function editArticle(req){
    if (req.body.title === undefined){
      return db.none('UPDATE articles SET body = $1 , author = $2, updated_at = now()  WHERE title = $3',[req.body.body, req.body.author, req.params.title])
      .catch(function(error) {
        console.log('failure database put',error);
      });
    } else {
       return db.none('UPDATE articles SET title = $1, body = $2 , author = $3, updated_at = now()  WHERE title = $4',[req.body.title, req.body.body, req.body.author, req.params.title])
        .catch(function(error) {
        console.log('failure database put',error);
      });
    }
  }

  function deleteArticle(req){
    return db.none(`DELETE FROM articles WHERE title = '${req.params.title}'`)
      .catch(function(error) {
        console.log('failure database delete',error);
      });
  }


  return {
    getArticle: getArticle,
    getArticles: getArticles,
    registerArticle: registerArticle,
    editArticle: editArticle,
    deleteArticle: deleteArticle,
  };
})();