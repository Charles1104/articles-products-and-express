module.exports = (function(){

  let productsArray = [];
  let counter = 0;

  function registerProduct(req){
    counter++;
    productsArray.push({"id": counter ,"name": req.name,"price": Number(req.price),"inventory": Number(req.inventory)});
  }

  function getProducts(){
    return productsArray;
  }

  function getNames(){
    return productsArray.map(function(x){return x.name;});
  }

  function getIds(){
    return productsArray.map(function(x){return x.id;});
  }

  function getIndex(number){
    return productsArray.map(function(x){return x.id;}).indexOf(Number(number));
  }

  function getProduct(number){
    return productsArray[productsArray.map(function(x){return x.id;}).indexOf(Number(number))];
  }

  return {
    registerProduct: registerProduct,
    getProducts: getProducts,
    getNames: getNames,
    getIds: getIds,
    getIndex: getIndex,
    getProduct: getProduct
  };
})();