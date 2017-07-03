 $(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBoQbcvsLtZOrjimhYTmWnJYczb_GX9fsA",
    authDomain: "traintime-db9c9.firebaseapp.com",
    databaseURL: "https://traintime-db9c9.firebaseio.com",
    projectId: "traintime-db9c9",
    storageBucket: "traintime-db9c9.appspot.com",
    messagingSenderId: "703747362411"
  };

  firebase.initializeApp(config);

var database = firebase.database();


$('#add-train-btn').on("click",function(event){
  event.preventDefault();
var trainName=$('#train-name-input').val().trim();
var destination=$('#destination-input').val().trim();
var FirstArrival= moment($("#first-train").val(), "HH:mm").subtract(10, "years").format("X");
var frequency=$('#frequency-input').val().trim();


console.log(destination);
console.log(FirstArrival);
console.log(frequency);

var newTrain={
	name: trainName,
    destination: destination,
    FirstArrival: FirstArrival,
    frequency:frequency
};
console.log(newTrain);
console.log(newTrain.frequency);
$('#trianform')[0].reset(); // reset all the values
database.ref().push(newTrain); // push the value to firbase




$('#train-name-input').val('');
$('#destination-input').val('');
$('#first-train').val('');
$('#frequency-input').val('');
return false;
}); // submit button event

database.ref().on("child_added", function(Snapshot,Key){
	 console.log(Snapshot.val());


  var tFrequency = Snapshot.val().frequency;
  console.log(tFrequency);
  var tFirstTrain = Snapshot.val().FirstArrival;
   console.log(tFirstTrain);

  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  console.log(tRemainder);
  var timeinMinutes = tFrequency - tRemainder;

  // To calculate the arrival time, add the tMinutes to the currrent time
  var tArrival = moment().add(timeinMinutes, "m").format("hh:mm A");


  console.log(tArrival);
  console.log(timeinMinutes);
 

  var row=$('<tr>');

    row.append($('<td>').text(Snapshot.val().name));
    row.append($('<td>').text(Snapshot.val().destination));
    row.append($('<td>').text(tFrequency));
    row.append($('<td>').text(tArrival));
    row.append($('<td>').text(timeinMinutes));
   $("#list-table").append(row);

 }),function(errorObject){
  console.log("Error handeled:"+ errorObject.code)
 }
 





//doc.ready 
});