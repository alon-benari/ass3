"use strict"
function Cs142TemplateProcessor(template){
  this.template = template
}

Cs142TemplateProcessor.prototype.fillIn =  function(dictionary){
  
  var newDict = this.shadowDictionary(dictionary)

  for (let k in Object.keys(newDict)){
    var theKey = Object.keys(newDict)[k];
    var re = new RegExp('[{][{]'+theKey+'[}][}]');
    // var re = new RegExp('[^{][{][{]'+theKey+'[}][}]');
    this.template = this.template.replace(re,newDict[theKey]);
  }
  

  return(this.template) 
}


Cs142TemplateProcessor.prototype.getRegEx = function(dict){
  return Object.keys(dict).map(x=>'\\s{{'+x+'}}\\s')
}

Cs142TemplateProcessor.prototype.curlyWords = function(){
 
  var regExp = /[{][{][^{]*[^}][}][}]/g;
  var noCurls = this.template.match(regExp).map(x=>x.replace('{{',"")).map(x=>x.replace('}}',''))
  return noCurls.map(x=>x.replace(/^[^a-zA-Z0-9]+/,'')).map(x=>x.replace(/[^a-zA-Z0-9]+$/,''))
}



Cs142TemplateProcessor.prototype.shadowDictionary = function(dictionary){
  /*
  A method to format the keys in the dictionary and return a new keys with the new values.
  */
  
  var curly = this.curlyWords();
  var tempObject = {};
  curly.map(function(x){
  if  (dictionary.hasOwnProperty(x)){
    tempObject[x] = dictionary[x];
  }else{
    tempObject[x] = ''
  }
  }
);
  return tempObject
}
/*
console.log(typeof(Cs142TemplateProcessor))
var dictionary = {month:'July',day:'1',year:'2016'}
var template = 'My favorite month is {{month}} but not the day {{day}} or the {{fair}} year {{year}}';
var dateTemplate = new Cs142TemplateProcessor(template)
var v = dateTemplate.fillIn(dictionary)
console.log(v)
console.log(v === 'My favorite month is July but not the day 1 or the year 2016')
*/
