

// var element = document.getElementById("first")
// console.log(element.innerHTML)
// document.getElementById("out").innerHTML = element.innerHTML+'XXX'


// // document.getElementById("toReplace").innerHTML = "<h1 style = 'color:blue'>"+toReplace+ "</h1>"


//   document.getElementById("time").innerHTML = Date()
//   var d = new Date()
//   document.getElementById("dayOfWeek").innerHTML = "Day of the week is: " +d.getDay()
//   var toReplace = document.getElementById("replaceMe")
//   console.log(toReplace.innerHTML)
//   document.getElementById("replaced").innerHTML = "<h1 style='color:blue' >"+ toReplace.innerHTML +"</h1>"
//   document.getElementById("first").innerHtml = "+++++"
  
var DatePicker = function (div){
 this.div = div;
  this.precedingMonth = {12:11,1:12,2:1,3:2,4:3,5:4,6:5,7:6,8:7,9:8,10:9,11:10}

  this.followingMonth = {1:2,2:3,3:4,4:5,5:6,6:7,7:8,8:9,9:10,11:12,12:1}
  this.weekDays = {0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"};
  this.monthName = {1:"January",2:"February",3:"March",4:"April",
                    5:"May",6:"June",7:"July",8:"August",9:"September",
                    10:"October",11:"November",12:"December"}
  this.daysToPush = {'Mon':1,'Tue':2,'Wed':3,'Thu':4,'Fri':5,'Sat':6,'Sun':0}
  this.mainDate = "";

};

  DatePicker.prototype.daysObject = function(dates,dayName,rgb){
    return
      var dateObject = {
        daysNum:dates,
        daysOfWeek:dayName,
        color:rgb,
       
    }
  }

  DatePicker.prototype.getDaysInMonth = function (dateObj){
  /* A method to return the dates and their corresponding names */
  var year = dateObj.getFullYear()
  var month = dateObj.getMonth()
  var count = new Date(year,month+1,0).getDate()// how many days a month?

  daysNum = [];
  for (i=0;i<count;i++){
    daysNum.push(i)
  }
  daysNum = daysNum.map(x=>x+1)
  var daysOfWeek = daysNum.map(x=> new Date(this.monthName[month+1]+','+x+','+year).getDay()).map(x=>this.weekDays[x])// Mon, Tue, Wed....
  var daysNames = {daysNum:daysNum, 
                   daysOfWeek:daysOfWeek}
  return daysNames
  }

  DatePicker.prototype.getHeaderTrailer = function(obj, index){
    /*
    A mehtod that accepts an object (from getDaysInMonth)  and an index (header/trailer) and returns the corresponding pieces to be attached to the existing arrays of the main month.
    */
   if (index>0){
     var newObj = {
       daysNum : obj.daysNum.slice(0,index),
       daysOfWeek: obj.daysOfWeek(slice,index)}

   } else if (index < 0){
     var newObj = {
      daysNum : obj.daysNum.slice(index),
      daysOfWeek : obj.daysOfWeek.slice(index)
     }
    
   } else {
     var newObj = {
      daysNum : obj.daysNum,
      daysOfWeek: obj.daysOfWeek
     }
   }
   
   console.log(Array(newObj.daysNum.length).fill('grey'))
   cosnole.log('new Obj: ',newObj)
   return newObj
  }

  DatePicker.prototype.render = function(dateObject){
    
    var month = dateObject.getMonth();
    console.log(month)
    console.log(this.monthName[month+1])
    var day = dateObject.getDay();
    var year = dateObject.getFullYear()
    console.log(year);
    var mdyObject = {day : day,month:month,year :year}
    var color = 'black'

  // }
  // DatePicker.prototype.getDaysInMonth = function getDaysInMonth(month, year,color){
  /*
  A method to return the days and day names for a given month in a given year.
  */
    // daysNames = this.getDaysInMonth(month+1,year);
    console.log(dateObject)
    daysNames = this.getDaysInMonth(dateObject); // get data for current month

    var pre = dateObject.setMonth(dateObject.getMonth()-1)// get data for previous month
    var preDaysNum = this.getDaysInMonth(dateObject)  
    console.log(preDaysNum)
    var next = dateObject.setMonth(dateObject.getMonth()+2) // get ata for next month
    var nextDaysNum = this.getDaysInMonth(dateObject)
    console.log(nextDaysNum)
    //
    // start parsing the header and trailer
    //

  var daysNum = daysNames.daysNum
  var daysOfWeek = daysNames.daysOfWeek
  //
  

  
  var header = this.daysToPush[daysOfWeek[0]]
  console.log(header)
  // console.log(this.getHeaderTrailer(preDaysNum,header))


  var trailer = this.daysToPush[daysOfWeek.slice(-1)[0]]-6
  console.log(trailer)
  var lastDay =  daysOfWeek.slice(-1)[0]
  var color = Array(5).fill(color) // set color for 


  this.mainDate = {color:color,
          daysOfWeek:daysOfWeek,
          daysNum:daysNum, 
          
          }
  return this.mainDate
  
  }

  
function func(clicked_id){
  
  console.log('click')
  console.log(clicked_id)
  console.log(document.getElementById(clicked_id).innerHTML)
  document.getElementById("click").innerHTML = "X"
  console.log(document.getElementById(clicked_id).innerHTML)

}
function start(obj){
var nrows = obj.daysNum/7.0
console.log(nrows)
console.log('making a table')
var myDiv = document.getElementById("tableIt");
var myTable = document.createElement("table");  
var myThead = document.createElement("thead")
var headerRow = document.createElement("tr");
//var th =  document.createElement("th")
//
var lt = document.createElement("th")
lt.addEventListener('click',function(){console.log("<")})
headerLT = document.createTextNode(" <  ")
lt.appendChild(headerLT)
headerRow.appendChild(lt)
//
var th =  document.createElement("th")
headerYear = document.createTextNode("month")
th.appendChild(headerYear)
headerRow.appendChild(th)
//
var gt = document.createElement("th")
gt.addEventListener('click',function(){console.log('>')})
headerGT = document.createTextNode(">")
gt.appendChild(headerGT)
headerRow.appendChild(gt)


myThead.appendChild(headerRow)
myTable.appendChild(myThead)
myDiv.appendChild(myTable)

var myThead = document.createElement("thead")
var headerRow = document.createElement("tr");
var th =  document.createElement("th")


headerYear = document.createTextNode("year")

th.appendChild(headerYear)
headerRow.appendChild(th)
myThead.appendChild(headerRow)
myTable.appendChild(myThead)
myDiv.appendChild(myTable)


var myTableBody = document.createElement('tbody');
for (var j = 0;j < 5;j++){
  var myCurrentRow = document.createElement("tr")
  
  for (var i = 0;i<7;i++){
    myCurrentCell = document.createElement("td")
    myCurrentCell.style.color = "grey"
    myCurrentCell.onclick = function(){alert('blahhh')}
    currentText = document.createTextNode(i)
    
    myCurrentCell.appendChild(currentText);
    myCurrentRow.appendChild(myCurrentCell)
  }
  myTableBody.appendChild(myCurrentRow)

}
myTable.appendChild(myTableBody)
myDiv.appendChild(myTable)
// document.getElementById("tableIt").innerHTML = myTable

}


 

var datePicker = new DatePicker("Hello")
var curr = datePicker.render(new Date('5/1/2018'))

console.log(curr)
