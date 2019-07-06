
function timeTurn(timeValue){
  if(timeValue){ return Math.floor(timeValue/3600)+":"+Math.floor(timeValue%3600/60)+":"+Math.floor(timeValue%3600%60)}
  else{
    return "00:00:00"
  }
}
function countTimeDiff(start,timeRecord) {
  if(start){
      return timeTurn(Math.floor((timeRecord+(Date.now()-start))/1000));
  }
  else{
    return timeTurn(timeRecord/1000);
  }
}


export {countTimeDiff}