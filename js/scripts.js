function Order(){
  this.pizzas = [];
};

Order.prototype.addPizza = function(size, crust, sauce, cheeseType, cheeseAmmount, meats, veggies){
  var newPizza = new Pizza(size, crust, sauce, cheeseType, cheeseAmmount, meats, veggies);
  this.pizzas.push(newPizza);
}

function Pizza(size, crust, sauce, cheeseType, cheeseAmmount, meats, veggies){
  this.size = size;
  this.crust = crust;
  this.sauce = sauce;
  this.cheeseType = cheeseType;
  this.cheeseAmmount = cheeseAmmount;
  this.meats = meats;
  this.veggies = veggies;
};


$(function(){
  var newOrder = new Order;
  $("#start").click(function(){
    $("#start").hide();
    $(".pizzaSelector").slideDown(1500);
  });

  $("#addPizza").click(function(){
    var sizeInput = $("#size").val();
    var crustInput = $("#crust").val();
    var sauceInput = $("#sauce").val();
    var cheeseTypeInput = $("#cheeseType").val();
    var cheeseAmmountInput = $("#cheeseAmmount").val();
    var meatsInput = $("input:checkbox[name=meats]:checked").map(function(){
      return this.value;
    });
    var veggiesInput = $("input:checkbox[name=veggies]:checked").map(function(){
      return this.value;
    });
    newOrder.addPizza(sizeInput, crustInput, sauceInput, cheeseTypeInput, cheeseAmmountInput, meatsInput, veggiesInput);
  });

  $("form.pizzaSelector").submit(function(){
    var sizeInput = $("#size").val();
    var crustInput = $("#crust").val();
    var sauceInput = $("#sauce").val();
    var cheeseTypeInput = $("#cheeseType").val();
    var cheeseAmmountInput = $("#cheeseAmmount").val();
    var meatsInput = $("input:checkbox[name=meats]:checked").map(function(){
      return this.value;
    });
    var veggiesInput = $("input:checkbox[name=veggies]:checked").map(function(){
      return this.value;
    });
    newOrder.addPizza(sizeInput, crustInput, sauceInput, cheeseTypeInput, cheeseAmmountInput, meatsInput, veggiesInput);

    $(".pizzaSelector").slideUp(1500);
    
  });
});
