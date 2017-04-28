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

  function editArticle(req){
    return db.none(`UPDATE articles SET title = '${req.body.title}', body = '${req.body.body}', author = '${req.body.author}' WHERE title = '${req.params.title}'`)
      .catch(function(error) {
        console.log('failure database put',error);
      });
  }

  function deleteArticle(req){
    return db.none(`DELETE FROM articles WHERE title = '${req.params.title}'`)
      .catch(function(error) {
        console.log('failure database delete',error);
      });
  }

  function getArticle(string){
    return db.one(`SELECT * FROM articles WHERE title = '${string}'`)
      .catch(function(error) {
        console.log('failure database get articles/title', error);
      });
  }

  function getTitles(){
    return articlesArray.map(function(x){return x.title;});
  }

  function getIndex(string){
    return articlesArray.map(function(x){return x.title;}).indexOf(string);
  }

  function registerArticle(req){

    articlesArray.push(
    {
      "title": req.title,
      "body": req.body,
      "author": req.author,
      "urlTitle": encodeURI(req.title)
    });
  }

  return {
    getArticles: getArticles,
    getArticle: getArticle,
    getTitles: getTitles,
    getIndex: getIndex,
    registerArticle: registerArticle,
    editArticle: editArticle,
    deleteArticle: deleteArticle,
    db: db
  };
})();