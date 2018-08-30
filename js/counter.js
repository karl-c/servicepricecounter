/*global document: false */


// Set core variables
var totalPrice = 0;
var serviceList = [];

var allCards = document.getElementsByClassName("card");

var sList = document.getElementById("services-list");

function load() {
  refreshPrice();
  services();
  refreshArray();
}
// Refresh the price displayed
function refreshPrice() {
  document.getElementById("price").innerHTML = totalPrice;
}

// Refresh the array of services selected and display the correct msg
function refreshArray() {
  if (serviceList === undefined || serviceList.length == 0) {
    sList.innerHTML = "You have no services selected";
  } else {
    serviceList.sort();
    sList.innerHTML = serviceList;
  }
}

// Remove specific value of the array
function remove(array, element) {
  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

// Increase the price by x
function increase(amount) {
  totalPrice += amount;
  refreshPrice();
}

// Decrease the price by x
function decrease(amount) {
  totalPrice -= amount;
  refreshPrice();
}

// Handles the main box click action, such as adding the selected class, calulating how much to add to the price by parsing and parsing the title of the service for the array
function services() {

  $(".card").click(function() {
    $(this).toggleClass("selected");

    var cardStr =  $(this).text();
    var cardTitle = $(this).find(".service-title").text();
    var strArray = cardStr.match(/(\d+)/g);

    for(i=0; i<strArray.length;i++) {
      var price = parseFloat(strArray[i]);
    }

    if ($(this).hasClass('selected')) {

      increase(price);
      serviceList.push(" " + cardTitle);
      refreshArray();

    } else {

      decrease(price);
      remove(serviceList, " " + cardTitle);
      refreshArray();

    }

  });

  // Manages the bottom button to send the mail with the services embedded in it
  $("#enquireBtn").click(function() {
    var subject = "My Chosen Services";
    var yourMessage = "Hey!\n\nI'd like to know more about" + serviceList;

    $(".card").each(function(){

        if($(this).hasClass("selected")){
          document.location.href = "mailto:example@example.agency?subject="
              + encodeURIComponent(subject)
              + "&body=" + encodeURIComponent(yourMessage);
          $("#enquireBtn").removeClass("btn-danger");
          $("#warningBtn").addClass("invisible");
        } else {
          $("#enquireBtn").addClass("btn-danger");
          $("#warningBtn").removeClass("invisible");
        }


     });
  });
}
