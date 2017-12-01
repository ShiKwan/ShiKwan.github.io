/* global firebase moment */


// 
// 1. ADD YOUR FIREBASE DATABASE CONFIG HERE
 // Initialize Firebase
var config = {
  apiKey: "AIzaSyDSfTjE2oQpvJApAwh2tO345z_kBeHoH4g",
  authDomain: "timesheetproj.firebaseapp.com",
  databaseURL: "https://timesheetproj.firebaseio.com",
  projectId: "timesheetproj",
  storageBucket: "",
  messagingSenderId: "956181445993"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  
  var empName = $("#employee-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  // 2. Declare empStart by parsing #start-input val using moment
  var empStart = moment($("#start-input").val().trim(), "DD-MM-YY").format("X");
  var empRate = $("#rate-input").val().trim();

  // 3. create newEmp object with the properties name, role, start, rate and use the variables declared above
  var newEmp = {
    name : empName,
    role : empRole,
    start: empStart,
    rate: empRate
  };

  // 4. push newEmp into the firebase database
  database.ref().push({
    name: newEmp.name,
    role: newEmp.role,
    start: newEmp.start,
    rate: newEmp.rate
  })

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  // Alert
  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

database.ref().orderByChild("name").on("child_added", function(snapshot){
  console.log(snapshot.val());
  console.log(snapshot.val().name);
  console.log(snapshot.val().role);
  console.log(snapshot.val().start);
  console.log(snapshot.val().rate);

  var trEmployee, tdName, tdRole, tdStart, tdRate;
  trEmployee = $("<tr>");
  tdName = $("<td>");
  tdRole = $("<td>");
  tdStart = $("<td>");
  tdRate = $("<td>");
  tdWorked = $("<td>");
  tdBilled = $("<td>");

  var dateStart = moment.unix(snapshot.val().start).format("DD-MM-YY");
  var rate = snapshot.val().rate/12;
  var worked = (moment().diff(moment.unix(snapshot.rate), "months"));
  console.log(worked);
  var totalBilled = snapshot.val().rate * (moment().diff(moment(dateStart), "months"));


  tdName.text(snapshot.val().name);
  tdRole.text(snapshot.val().role);
  tdStart.text(moment.unix(snapshot.val().start).format( "DD-MM-YY"));
  tdRate.text(snapshot.val().rate);
  tdWorked.text(worked);
  tdBilled.text(totalBilled);

  trEmployee.prepend(tdBilled).prepend(tdRate).prepend(tdWorked).prepend(tdStart).prepend(tdRole).prepend(tdName);
  $("#employee-table > tbody").append(trEmployee);

})

// 3.  use database.ref().on("child_added") to respond to when a new child (which in this case will represent an employee) is added
// 3.a be sure to format the .start timestamp value using moment.unix and moment.format
// 3.b calculate the number of months they have worked using moment().diff
// 3.c calculate the total billed rate by multiplying the total months with the rate
// 3.d select "#employee-table > tbody" and append a new table row for the employee, where each cell (td) is represented: name, role, the formatted start date, total months, rate, and total billed

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case