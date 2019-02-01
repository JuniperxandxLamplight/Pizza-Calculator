function Order(){
  this.pizzas = [];
  this.items = 0;
};

Order.prototype.addPizza = function(size, crust, sauce, cheeseType, cheeseAmmount, meats, veggies){
  this.items += 1;
  var newPizza = new Pizza(size, crust, sauce, cheeseType, cheeseAmmount, meats, veggies);
  newPizza.id = "Pizza " + this.items;
  this.pizzas.push(newPizza);
};

Order.prototype.findPizza = function(id){
  for (var i=0; i< this.pizzas.length; i++) {
      if (this.pizzas[i].id == id) {
        return this.pizzas[i];
      }
    };
  return false;
}

Order.prototype.checkPrice = function(){
  var price = 0;
  this.pizzas.forEach(function(pizza){
    if (pizza.size === "Small (12\")"){
      price += 10;
    } else if (pizza.size === "Medium (16\")"){
      price += 15;
    } else if (pizza.size === "Large (20\")"){
      price += 20;
    } else if (pizza.size === "Extra Large (28\")"){
      price += 25;
    }

    if (pizza.cheeseAmmount === "Extra"){
      price += 3;
    }

    for (i=0; i<pizza.meats.length; i++){
      if (price >= 25){
        price += 2;
      } else {
        price += 1.5;
      }
    };
    for (i=0; i<pizza.veggies.length; i++){
      if (price >= 25){
        price += 1.5;
      } else {
        price += 1;
      }
    };
  });
  return price;
};

function Pizza(size, crust, sauce, cheeseType, cheeseAmmount, meats, veggies){
  this.id;
  this.size = size;
  this.crust = crust;
  this.sauce = sauce;
  this.cheeseType = cheeseType;
  this.cheeseAmmount = cheeseAmmount;
  this.meats = meats;
  this.veggies = veggies;
};

function attachContactListeners(newOrder) {
  console.log(this.id);
  $("ul#pizzaResults").on("click", "li", function() {
    showDetails(newOrder, this.id);
  });
};

function showDetails(newOrder, pizzaId){
  console.log(pizzaId);
  var pizza = newOrder.findPizza(pizzaId);
    $("#pizzaDetails").slideDown("slow");
    $("sizeResult").html(pizza.size);
    $("crustResult").html(pizza.crust);
    $("sauceResult").html(pizza.sauce);
    $("cheeseResult").html(pizza.cheeseAmmount + " " + pizza.cheeseType);
    $("meatsResult").html(pizza.meats);
    $("veggiesResult").html(pizza.veggies);
    // var buttons = $("#buttons");
    // buttons.empty();
    // buttons.append("<button class='deleteButton' id=" +  + pizza.id + ">Delete</button>");
}


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
    console.log(newOrder);
  });

  $(".pizzaSelector").submit(function(event){
    event.preventDefault();
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

    newOrder.pizzas.forEach(function(pizza){
      $("#pizzaResults").append("<li id=" + pizza.id + ">" + pizza.id + "</li>");
    });

    var newOrderPrice = newOrder.checkPrice();
    $("#priceResult").text("$" + newOrderPrice);
    $(".pizzaSelector").slideUp(1500);
    $(".result").delay(1400).fadeIn("slow");
  });
  attachContactListeners(newOrder);
});
