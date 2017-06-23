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

  var trainDataRef = firebase.database();


// plaster data from firebase onto html 
  trainDataRef.ref().on("child_added", function (snapshot) {

 // <--- set variables based on user input ---> \\
  var trainName = snapshot.val().train;
  var destination = snapshot.val().dest;
      // for calculation purposes, make "frequency" an integer
  var frequency = parseInt(snapshot.val().freq);
  var tFirstTrain = snapshot.val().firstTrain;


  // calculate Next Arrival: divide difference of times by frequency.
  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % frequency;
  var tMinutes = frequency - tRemainder;
  // arrival time = tMinutes + currrent time
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    var tableRow = $('<tr>');
    var tableColumn = $('<td>')
    var trainNameColumn= $('<td>');
    var destinationColumn= $('<td>');
    var frequencyColumn= $('<td>');
    var tArrivalColumn= $('<td>');
    var tMinutesColumn= $('<td>');
    
    trainNameColumn.html(trainName);
    destinationColumn.html(destination);
    frequencyColumn.html(frequency + " minutes between trains");
    tArrivalColumn.html(tArrival);
    tMinutesColumn.html(tMinutes);    

    tableRow.append(trainNameColumn);
    tableRow.append(destinationColumn);
    tableRow.append(frequencyColumn);
    tableRow.append(tArrivalColumn);
    tableRow.append(tMinutesColumn);
    tableRow.css("color", "white");

  // add the row to the table 
    $('.tbody').append(tableRow);
  });


// When submit button is clicked, add pull
$('#submitBtn').on('click', function(event) {

    event.preventDefault();


    // Sets the values inside object to later be pushed to database
    // <--- set variables based on user input ---> \\
  var trainName = $('#trainName').val().trim();
  var destination = $('#destination').val().trim();
  var frequency = $('#frequency').val().trim();
  // translate user input of First Train Time to be moment.js friendly
  var tFirstTrain = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");


var trainData = {
    train: trainName,
    dest: destination,
    freq: frequency,
    firstTrain: tFirstTrain 
    };

    // check that the object looks accurate
console.log ('traindata:    ', trainData);

trainDataRef.ref().push(trainData);

  });


// end document ready function
});



