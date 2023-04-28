//get current day
var currentDay = $("#currentDay")

//set current day with moment and its format function
currentDay.text(moment().format("dddd MMMM Do"));