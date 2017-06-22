$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyAufTfcdROCnB4eSGDaOYtGgVxbV5GSyos",
    authDomain: "train-schedule-7f3ce.firebaseapp.com",
    databaseURL: "https://train-schedule-7f3ce.firebaseio.com",
    projectId: "train-schedule-7f3ce",
    storageBucket: "train-schedule-7f3ce.appspot.com",
    messagingSenderId: "984283218478"
  };
  
firebase.initializeApp(config);
  var currentTime;
  var timeTilArrival;
  var database = firebase.database();
  var trainListRef = database.ref('trains');
  var trainNumber=0;

// Adds row to train table
var addTrain = function(trainName, destination, frequency, nextArrival, minutesAway) {

  // Creates a reference in firebase to a new train, and pushes it to the database
  var trainRef = trainListRef.push();

  // Sets the values inside the empty Trains Reference
  newTrainsRef.set({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway
    });
    return newTrainsRef;
  };



// Calculates the total billed
var calculateTotalBilled = function(rate, monthsWorked) {
  return rate * monthsWorked;
};

// When submit button is clicked, add pull
$('#submitBtn').on('click', function(event) {
  event.preventDefault();
  var tableRow = $('<tr>');
  var tableColumn = $('<td>')
  var trainNameColumn= $('<td>');
  var destinationColumn= $('<td>');
  var frequencyColumn= $('<td>');
  var tArrivalColumn= $('<td>');
  var tMinutesColumn= $('<td>');

  var trainName = $('#trainName').val().trim();
  var destination = $('#destination').val().trim();
  var frequency = $('#frequency').val().trim() + " minutes between trains";
  var frequencyValue = parseInt($('#frequency').val().trim());

  // translate user input of First Train Time to be moment.js friendly
  var tFirstTrain = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
  // calculate Next Arrival: divide difference of times by frequency.
  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % frequencyValue;
  var tMinutes = frequencyValue - tRemainder;
  // arrival time = tMinutes + currrent time
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  

  
  trainNameColumn.html(trainName);
  destinationColumn.html(destination);
  frequencyColumn.html(frequency);
  tArrivalColumn.html(tArrival);
  tMinutesColumn.html(tMinutes);

  tableRow.append(trainNameColumn);
  tableRow.append(destinationColumn);
  tableRow.append(frequencyColumn);
  tableRow.append(tArrivalColumn);
  tableRow.append(tMinutesColumn);

  $('.tbody').append(tableRow)
tableRow.css("color", "white");

});










// end document ready function
});



