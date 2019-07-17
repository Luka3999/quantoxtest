var serverResponse = new Array();
var httpReq = new XMLHttpRequest();


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
   for(var i = 0; i < arr.length;i++){
       if (arr[i].day == day) return i;
   }
   return -1;
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
   return "<button class='button1'>"+ n + " " + d + "</button>";
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



