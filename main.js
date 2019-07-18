var serverResponse = new Array();
var httpReq = new XMLHttpRequest();


function calculateCalories(steps){
   return Math.round(steps * 0.05,2);

}

function calculateDistance(steps){
    return steps * 0.762
}

function renderTime(steps){
   var totaltime = calculateTime(steps);
   var days = Math.floor(totaltime/86400);
   totaltime -= days * 86400;
   var hours = Math.floor(totaltime/3600) % 24;
   totaltime -= hours * 3600;
   var minutes = Math.floor (totaltime/60) % 60;
   totaltime -= minutes * 60;
   
   return  hours + " h " + minutes + " min ";

}

function calculateTime(steps){
  return steps * 0.5
}

function getTimestampDay(timestamp){
   var d = new Date(timestamp);
   return d.getDay();
}

function findInArr(day, arr){
   for(var i = 0; i < arr.length;i++){
       if (arr[i].day == day) return i;
   }
   return -1;
}

function sumAllSteps(arr){
   var steps = 0;
   for(var i=0; i < arr.length;i++) {
    steps += arr[i].steps ; 
   }
   return steps;
   

}

function groupDates(data){
   var groupedDailyData = new Array();
   for(var i = 0; i < data.length;i++){
     var newRec = 
        {"steps": data[i].steps,
         "day": getTimestampDay(data[i].timestamp),
         "ts" :data[i].timestamp
       }
     var index = findInArr(newRec.day, groupedDailyData);
     if(index > -1){
        groupedDailyData[index] =
         {"steps": data[i].steps + groupedDailyData[index].steps,
           "day": newRec.day,
           "ts": newRec.ts
         };
     }else{
         groupedDailyData.push(newRec);
     }

   }
   
   return groupedDailyData;
}

function createButton(ts) {
   var d = new Date(ts).toLocaleString('en-us', {  weekday: 'short' });
   var n = getTimestampDay(ts);
   return "<button class='button1' onClick=showDetais("+n+")>"+ n + " " + d + "</button>";
}

function renderButtons(serverResponse){
   var buttons = [];
   for(var i = 0;i < serverResponse.length;i++){
      buttons.push(createButton(serverResponse[i].ts));
   }
   return buttons.join("");
}
var fetchData = function(url) {
  return new Promise((resolve, reject) => {
  httpReq.open('GET', url)

  httpReq.onload = () => {
    if (httpReq.status === 200) {
      resolve(httpReq.responseText)
    } else {
      reject(Error(httpReq.status))
    }
  }

  httpReq.send()
  })
}

function showDetais(day){
   var x=document.getElementById('header');
   x.style.display = 'none';

   var a=document.getElementById('overview');
   a.style.display = 'none';
}


