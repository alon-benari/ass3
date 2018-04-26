class TableTemplate{

  static fillIn(id, dict,colName){
     var tr= "{{PartNumber}}";
    
   
    /* go through headers first */
    // var headerCol1 = document.getElementById(id).firstChild.nextSibling.firstElementChild.firstChild.nextSibling.innerHTML
  
    // console.log(headerCol1)
    // var templateProcess = new Cs142TemplateProcessor(headerCol1);
    // var done = templateProcess.fillIn(dict)
    // console.log(done)
    // // Get the whole html
    //  var wholeTable = document.getElementById(id).childNodes[1].innerHTML
    // console.log(wholeTable)
    // fix the header
    var getHeaderOnly = document.getElementById(id).lastChild.childNodes[0].children
    var string = getHeaderOnly //[0]['innerHTML'];
    console.log(string)
    for (var i=0;i< string.length;i++){
      console.log(string[i])
      var templateProcess = new Cs142TemplateProcessor(string[i]['innerHTML']);
      var done = templateProcess.fillIn(dict)
      console.log(done)
      getHeaderOnly[i]['innerHTML'] = done

    }
    // Get the rest
    // var tableEntry = document.getElementById(id).lastChild.childNodes[2].childNodes
    // console.log(tableEntry[0].innerHTML)
    var tableEntry = document.getElementById(id).lastChild.childNodes
    console.log(tableEntry)



  }


}

TableTemplate.prototype.fixed = function(string){
  console.log(string)
}