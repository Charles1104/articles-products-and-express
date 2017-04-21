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

  return {
    registerProduct: registerProduct,
    getProducts: getProducts
  };
})();