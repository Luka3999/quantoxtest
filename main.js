var serverReponse = new Array();




function calculateCalories(steps){
   return steps * 0.05;
}

function calculateDistance(steps){
    return steps * 0.762
}

function calculateTime(steps){
  return steps * 0.5
}

function getTimestampDay(timestamp){
   var d = new Date(timestamp);
   return d.getDay();
}

function findInArr(day, arr){
   return arr.find(function(o){
      o.day = day;
   });
    
}
function groupDates(data){
   var groupedDailyData = new Array();
   for(var i = 0; i < data.length;i++){
     var newRec = {"steps": data[i].steps, "day": getTimestampDay(data[i].timestamp)}
     var index = findInArr(newRec.day,groupedDailyData);
     var day = getTimestampDay(data[i].timestamp);
     if(index > 0){
        var x = {"steps": data[i].steps + groupedDailyData[index].steps, "day": newRec.day};
        groupedDailyData[index] = x;
     }else{
         groupedDailyData.push(newRec);
     }

   }
   
   return groupedDailyData;
}

function loadData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(groupDates(JSON.parse(this.responseText)));
      }
    };
    xhttp.open("GET", "https://api.myjson.com/bins/1gwnal", true);
    xhttp.send();
  }