

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
  this.daysToPush = {'Mon':-1,'Tue':-2,'Wed':-3,'Thu':-4,'Fri':-5,'Sat':-6,'Sun':0}
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

  DatePicker.prototype.getDaysInMonth = function (dateObj,color){
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
                   daysOfWeek:daysOfWeek,
                   color: Array(daysNum.length).fill(color)
                  }
  return daysNames
  }

  DatePicker.prototype.getHeaderTrailer = function(obj, index){
    /*
    A mehtod that accepts an object (from getDaysInMonth)  and an index (header/trailer) and returns the corresponding pieces to be attached to the existing arrays of the main month.
    */
   var newObj = {}
   if (index>0){
     var newObj = {
       daysNum : obj.daysNum.slice(0,index),
       daysOfWeek: obj.daysOfWeek.slice(0,index),
       color:obj.color.slice(0,index)
     }
   
   } else if (index < 0){
     var newObj = {
      daysNum : obj.daysNum.slice(index),
      daysOfWeek : obj.daysOfWeek.slice(index),
      color:obj.color.slice(index)
     }
    
   } else {
     var newObj = {
      daysNum : [],
      daysOfWeek: [],
      color:[]
     }
   }
  
   return newObj
  }


  DatePicker.prototype.mergeObjs = function(obj1,obj2,obj3){
    /*
    An object to hold the merged objects
    */
   dates = []
    var mergeObj = {
      daysNum:dates.concat(obj1.daysNum, obj2.daysNum, obj3.daysNum),
      daysOfWeek:dates.concat(obj1.daysOfWeek, obj2.daysOfWeek, obj3.daysOfWeek),
      color:dates.concat(obj1.color, obj2.color, obj3.color)
    };
    return mergeObj

  }

  DatePicker.prototype.render = function(dateObject){
    
   
    var color = 'black'


  // console.log(dateObject)
  daysNames = this.getDaysInMonth(dateObject,'black'); // get data for current month
  console.log('current: ',daysNames)
  var pre = dateObject.setMonth(dateObject.getMonth()-1)// get data for previous month
  var preDaysNum = this.getDaysInMonth(dateObject,'grey')  
  console.log('pre: ',preDaysNum)
  var next = dateObject.setMonth(dateObject.getMonth()+2) // get ata for next month
  var nextDaysNum = this.getDaysInMonth(dateObject, 'grey')
  console.log('next: ',nextDaysNum)
  

  var daysNum = daysNames.daysNum
  var daysOfWeek = daysNames.daysOfWeek
  // get the header
  var header = this.daysToPush[daysOfWeek[0]]
  console.log(header)
  headerObj = this.getHeaderTrailer(preDaysNum,header)   // object with header
  var trailer = this.daysToPush[daysOfWeek.slice(-1)[0]]+6
  console.log(trailer)
  trailerObj = (this.getHeaderTrailer(nextDaysNum,trailer)) // object with trailer
  console.log('trailer OBJ :',trailerObj)
  //
  
  var color = Array(daysNum.length).fill(color) // set color for 
  /*
  return an oject with all the necessary pieces for writing the document.
  */
  calendarObject = this.mergeObjs(headerObj,daysNames,trailerObj)
  // this.mainDate = {color:color,
  //         daysOfWeek:daysOfWeek,
  //         daysNum:daysNum, 
  //         }


  return calendarObject
  
  }

var datePicker = new DatePicker("Hello")
var curr = datePicker.render(new Date('4/1/2018'))

 console.log('curr',curr)
