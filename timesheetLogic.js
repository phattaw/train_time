

var config = {
  apiKey: "AIzaSyA4s07UD-P4FmnPLcsJb6LmQqd2DmYkcEE",
  authDomain: "phattaws-awesome-project.firebaseapp.com",
  databaseURL: "https://phattaws-awesome-project.firebaseio.com",
  projectId: "phattaws-awesome-project",
  storageBucket: "phattaws-awesome-project.appspot.com",
  messagingSenderId: "11084339426"
};

firebase.initializeApp(config);

var database = firebase.database();

console.log("Initialized");
// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var startTime = $("#start-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    start: startTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;

  var currentTime = moment(moment()).format("HHmm");
  var difference = currentTime - trainStart;
  var minutesAway = frequency - (difference % frequency);
  var timeBasedMoment = moment().add(minutesAway, 'minutes').format("HH:mm A");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(timeBasedMoment),
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

