var taskEl = $("#task");
var saveButton =$(".saveBtn")
var table =$(".table")

//array to save tasks in
var tasks=[];
var savedTasks = JSON.parse(localStorage.getItem("savedTasks"));

//get current day
var currentDay = $("#currentDay")

//set current day with moment and its format function
currentDay.text(moment().format("dddd MMMM Do"));

//create 8 timeblocks
function init(){

    //check if there are any saved tasks 
    if(savedTasks!=null){
        tasks = savedTasks
    }else{
        console.log("No saved items");
    }

    //start hour
    var hour = moment("8 AM", "h A");
    for(i=0; i<12;i++){

        //add one hour
        hour = moment(hour).add(1,"hours");
        //create hour elements
        var rowClass = "row-"+i;
        var tableRow = $("<tr>").addClass("row time-block").attr("row-number",rowClass);
        //display hour in a desired format
        var hourEl = $("<td>").addClass("col-lg-2 col-md-2 col-sm-2 col-2 hour").text(hour.format("h A"))
        
        //create task elements
        var taskEl = $("<td>").addClass("col-lg-9 col-md-9 col-sm-9 col-9 description")
        var task = $("<textarea>").attr("type","text").attr("id","task")
        taskEl.append(task)
        
        //create button elements
        var buttonEl = $("<td>").addClass("col-lg-1 col-md-1 col-sm-1 col-1");
        var button = $("<button>").addClass("saveBtn")
        var iconEl = $("<i>").addClass("fa-solid fa-floppy-disk fa-lg")
        button.append(iconEl);
        buttonEl.append(button);

        //append all elements to the table
        tableRow.append(hourEl, taskEl,buttonEl);
        table.append(tableRow);
    }
}

function checkTime(){
    //get a number value from current time
    var currentHour = moment().hour();
    var compareTime;

    //loop through entire table
    $('table tr').each(function(){
        //get a number value from time from each row
        compareTime = moment($(this).children(".hour").text(),"h A").hour();
        console.log(compareTime);
        console.log(currentHour);

        //compare times
        if(compareTime<currentHour){
            console.log("yes")
            //if time from row 
            $(this).children(".description").addClass("past")
        }else if( compareTime == currentHour){
            $(this).children(".description").addClass("present")

        }else{
            $(this).children(".description").addClass("future")
        }
    })
}

saveButton.on("click", function(event){
    var task = taskEl.val()
    tasks.push(task);
    localStorage.setItem("savedTasks",JSON.stringify(tasks));
    console.log(task);
})

init();
checkTime();