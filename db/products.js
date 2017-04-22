module.exports = (function(){

  let productsArray = [];
  let counter = 0;

  function getProducts(){
    return productsArray;
  }

  function getNames(){
    return productsArray.map(function(x){return x.name;});
  }

  function getIndex(number){
    return productsArray.map(function(x){return x.id;}).indexOf(Number(number));
  }

  function getProduct(number){
    return productsArray[productsArray.map(function(x){return x.id;}).indexOf(Number(number))];
  }

  function registerProduct(req){
  counter++;
  productsArray.push({
    "id": counter ,
    "name": req.name,
    "price": Number(req.price),
    "inventory": Number(req.inventory)});
  }

  function editProduct(req){
    for (var key in req.body){
      productsArray[productsArray.map(function(x){return x.id;}).indexOf(Number(req.params.id))][key] = req.body[key];
    }
  }

  function deleteProduct(req){
    productsArray.splice(productsArray.map(function(x){return x.id;}).indexOf(Number(req)),1);
  }

  return {
    getProducts: getProducts,
    getNames: getNames,
    getIndex: getIndex,
    getProduct: getProduct,
    registerProduct: registerProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct
  };
})();