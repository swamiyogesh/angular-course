(function(){
  'use strict';

  angular.module("ShoppingListCheckOff",[])
  .controller("ToBuyController",ToBuyController)
  .controller("AlreadyBoughtController",AlreadyBoughtController)
  .service("ShoppingListCheckOffService",ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buy = this;
    buy.items = ShoppingListCheckOffService.getItems();

    buy.removeItem = function(itemIndex){
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  }




  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var already = this;
    already.broughtArray = ShoppingListCheckOffService.getbrought();
  }


  function ShoppingListCheckOffService() {
    var service=this;
    var items = [
      {name: "cookies", quantity:"10"},
      {name: "chocolates", quantity:"20"},
      {name: "Toffee", quantity:"30"},
      {name: "bread", quantity:"40"},
      {name: "cupcakes", quantity:"50"}
    ];

    var broughtArray = [];

    service.getItems = function(){
      return items;
    };

    service.getbrought = function () {
      return broughtArray;
    }

    service.removeItem = function(itemIndex){
      broughtArray.push(items[itemIndex]);
      items.splice(itemIndex,1);
    };

    // service.addItem = function (itemName,quantity) {
    //   var item ={
    //     name : itemName,
    //     quantity : quantity
    //   };
    //   items.push(item);
    // };


  }



})();
