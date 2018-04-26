class TableTemplate{

  static fillIn(id, dict,colName){
     
    
  // pack some methods utility 
    var fixed = {
      'mutate':function(string){
                                var templateProcess = new Cs142TemplateProcessor(string)
                                return done = templateProcess.fillIn(dict)
                                },
      'Part Number':function(){  
                                  for (var i=1;i<5;i++){
                                  console.log('updating: ',i)
                                  var s = tableEntry[i].childNodes[0].innerHTML
                                  tableEntry[i].childNodes[0].innerHTML=this.mutate(s)
                            }
                          },
    
      'Length':function(){  
                                for (var i=1;i<5;i++){
                                console.log('updating: ',i)
                                var s = tableEntry[i].childNodes[1].innerHTML
                                tableEntry[i].childNodes[1].innerHTML=this.mutate(s)
                          }
                        }         
                          
        }
                          
      
    // take care of the header first.
    var getHeaderOnly = document.getElementById(id).lastChild.childNodes[0].children
    var string = getHeaderOnly   
    // console.log(string)
    for (var i=0;i< string.length;i++){
      // console.log(string[i])
      var templateProcess = new Cs142TemplateProcessor(string[i]['innerHTML']);
      var done = templateProcess.fillIn(dict)
     
      getHeaderOnly[i]['innerHTML'] = done
      // console.log('fixing the header')

    }
    // Get the rest
    // var tableEntry = document.getElementById(id).lastChild.childNodes
    // console.log(tableEntry[0].innerHTML)
    var tableEntry = document.getElementById(id).lastChild.children
    console.log(colName)
    console.log(tableEntry[1])
    if (colName==='Length'){
      fixed['Length']()
    } else if (colName ==='Part Number'){
      fixed['Part Number']()
    } else if (!colName ) {
        console.log('ColName is undefined')
        fixed['Length']();
        fixed['Part Number']()
      }
    

  }


}

