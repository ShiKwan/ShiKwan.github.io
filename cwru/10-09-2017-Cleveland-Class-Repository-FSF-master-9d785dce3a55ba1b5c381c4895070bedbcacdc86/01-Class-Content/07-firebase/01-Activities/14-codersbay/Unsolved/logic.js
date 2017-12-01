// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
    var config = {
    apiKey: "AIzaSyDZ51u5EY9CSxjcMJ3elsCqZruzHhaQyEk",
    authDomain: "bcs-cle-firebase-demo-28336.firebaseapp.com",
    databaseURL: "https://bcs-cle-firebase-demo-28336.firebaseio.com",
    projectId: "bcs-cle-firebase-demo-28336",
    storageBucket: "bcs-cle-firebase-demo-28336.appspot.com",
    messagingSenderId: "287283023643"   
    }
   
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
     highPrice = snapshot.val().highPrice;
     console.log("highPrice : " + highPrice);
     highBidder = snapshot.val().highBidder;
     console.log("highBidder : " + highBidder);

    // Change the HTML to reflect the stored values
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);


    // Print the data to the console.


  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
    $("#highest-bidder").text(initialBidder);
    $("#highest-price").text(initialBid);


    // Print the data to the console.
    console.log("initial Bidder : " + $("#highest-bidder").val())
    console.log("initial bid : " + $("#highest-bidder").val())


  }


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var bidPrice = $("#bidder-price").val();
  var bidName = $("#bidder-name").val();


  // Log the Bidder and Price (Even if not the highest)
  if (bidPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase

      database.ref().set({
        highBidder: bidName,
        highPrice: bidPrice
      });

      console.log("change highest bid and bidder to : " + bidPrice + ", " + bidName);

    // Log the new High Price


    // Store the new high price and bidder name as a local variable
    highPrice = bidPrice;
    highBidder = bidName;


    // Change the HTML to reflect the new high price and bidder
        $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);

  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
