
var DatePicker = function (div,callback){
 this.div = div;
  this.precedingMonth = {12:11,1:12,2:1,3:2,4:3,5:4,6:5,7:6,8:7,9:8,10:9,11:10}

  this.followingMonth = {1:2,2:3,3:4,4:5,5:6,6:7,7:8,8:9,9:10,11:12,12:1}
  this.weekDays = {0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"};
  this.monthName = {1:"January",2:"February",3:"March",4:"April",
                    5:"May",6:"June",7:"July",8:"August",9:"September",
                    10:"October",11:"November",12:"December"}
  this.daysToPush = {'Mon':-1,'Tue':-2,'Wed':-3,'Thu':-4,'Fri':-5,'Sat':-6,'Sun':0}
  


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
    
  this.dateObject = dateObject
  console.log(this.dateObject)
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
 
  calendarObject.year = this.dateObject.getFullYear()
  calendarObject.month = this.monthName[this.dateObject.getMonth()]
  this.start(calendarObject)
 
  return calendarObject

}


DatePicker.prototype.start = function(obj){
var thediv = this.div;
console.log(this.dateObject)
wk = []
while(obj.daysNum.length) wk.push(obj.daysNum.splice(0,7))
c = [] // a vector to hold the colors for the table cells.
while(obj.color.length) c.push(obj.color.splice(0,7))
console.log('wk:',typeof(wk))
console.log('c:',c)
//
var myTableDiv = document.getElementById("datepicker1")
var table = document.createElement('TABLE')
var tableBody = document.createElement('TBODY')
//
// formatting the : <
//
var headerRow = document.createElement("tr");
var lt = document.createElement("th")
lt.width = '75'
lt.onclick = this.decrementMonth();
headerLT = document.createTextNode(" <  ")
lt.appendChild(headerLT)
headerRow.appendChild(lt)
tableBody.appendChild(headerRow)
//
// formatting the : month
//
var month = document.createElement("th")
month.setAttribute('id','month')
headerMonth = document.createTextNode(obj.month)
month.appendChild(headerMonth)
month.width = '25'
headerRow.appendChild(month)
tableBody.appendChild(headerRow)
//formatting the : >
var gt = document.createElement("th")
gt.width = '75'
gt.onclick = this.incrementMonth(this.dateObject)///
headerGT = document.createTextNode(" >  ")
gt.appendChild(headerGT)
headerRow.appendChild(gt)
tableBody.appendChild(headerRow)
// formatting the year
var headerYear = document.createElement('tr') // Add new row.
var thYear = document.createElement('th')
thYear.setAttribute('id','year')
YEAR= document.createTextNode(obj.year)
thYear.appendChild(YEAR)
thYear.width = '20'
thYear.align = 'center'
headerYear.appendChild(thYear)
tableBody.appendChild(headerYear)
//
// Add a row for  days of week
// 
weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
wdays = document.createElement('tr')

for (var d =0; d<weekDays.length;d++){
  console.log(this.weekDays[d])
  dname = document.createElement('th')
  wd = document.createTextNode(weekDays[d])
  dname.appendChild(wd);
  wdays.appendChild(dname)
}

tableBody.appendChild(wdays)

// add rows of dates
for (var i = 0;i < wk.length;i++){
  var tr= document.createElement("tr")
 
  for (var j=0; j<7;j++){
        var td = document.createElement("td")
        td.width = '20'
        td.style.color = c[i][j]
        if (c[i][j]!='grey'){
          
          td.setAttribute('id','r'+i+'c'+j) // set an id for td
          td.onclick = function(){console.log(this.id); 
                                  var dd = document.getElementById(this.id).innerHTML;
                                  var mm = document.getElementById('month').innerHTML;
                                  var yy = document.getElementById('year').innerHTML;
                                
                                  var fixedDate = {id:this,day:dd,month:mm,year:yy,parent:typeof(x)};

                                  console.log(fixedDate);
                                  callback(fixedDate)
                                };
                                  
        }
        
        currentText = document.createTextNode(wk[i][j])
        
        
        td.appendChild(currentText);
        
       tr.appendChild(td)
        
    } 
    tableBody.appendChild(tr)
 }


table.appendChild(tableBody)
console.log(myTableDiv)
myTableDiv.appendChild(table)
 

}

callback = function(fixedDate){
    console.log( " selected date: " ,fixedDate.month+'/'+fixedDate.day+'/'+fixedDate.year);

}


DatePicker.prototype.decrementMonth = function(){
  console.log('decrease')
}
DatePicker.prototype.incrementMonth =  function(obj){
 console.log(typeof(obj))
  // console.log((new Date(this.dateObject.setMonth(this.dateObject.getMonth()+1))))
  console.log(new Date(obj))
}
  
var datePicker = new DatePicker("datePicker1", callback)
datePicker.render(new Date('6/1/2018'))

 console.log('curr',curr)
