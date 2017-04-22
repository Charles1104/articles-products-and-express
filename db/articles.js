module.exports = (function(){

  let articlesArray = [];

  function getArticles(){
    return articlesArray;
  }

  function getArticle(string){
    return articlesArray[articlesArray.map(function(x){return x.title;}).indexOf(string)];
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

  function editArticle(req){
    for (var key in req.body){
      articlesArray[articlesArray.map(function(x){return x.title;}).indexOf(Number(req.params.title))][key] = req.body[key];
    }
    articlesArray[articlesArray.map(function(x){return x.title;}).indexOf(Number(req.params.title))].urlTitle = encodeURI(req.body.title);
  }

  function deleteArticle(req){
    articlesArray.splice(articlesArray.map(function(x){return x.title;}).indexOf(Number(req)),1);
  }

  return {
    getArticles: getArticles,
    getArticle: getArticle,
    getTitles: getTitles,
    getIndex: getIndex,
    registerArticle: registerArticle,
    editArticle: editArticle,
    deleteArticle: deleteArticle
  };
})();