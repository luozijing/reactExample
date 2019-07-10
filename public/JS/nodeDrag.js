import * as d3 from "d3"
import {graph} from "./nodeData";
import {nodeIndex} from "./nodeData";
let linkWidth = 8, linkHeight = 8;
let width = 90, height = 70;
let dragSpace = 10;
let droppedId = null;

let drag = d3.drag().on("drag",function (d) {
  d.dx = d3.event.x;
  d.dy = d3.event.y;
  d3.select(this.parentNode)
    .select("#"+d.id+"-path")
    .attr("d",d3.line()([[d.x+linkWidth,d.y+linkHeight/2],[d.dx,d.dy]]));
  let transformedPosition = TransformCoor(d3.event.x,d3.event.y,d.id.split("-")[0]);
  let droppedIdCompare =  JudgeScope(transformedPosition, upInterface);
  console.log(droppedId,droppedIdCompare);
  if(droppedId !== droppedIdCompare && droppedIdCompare){
    droppedId = droppedIdCompare;
  }
  (droppedIdCompare || droppedId === d.id) ?d3.select("#"+droppedId).attr("stroke-width",2).attr("stroke","red"):d3.select("#"+droppedId).attr("stroke-width",0);
})
  .on("start",function (d) {
    console.log(d);
    d3.select(this).attr("stroke-width",1).attr("stroke","red");
    let pathNumber = d3.select(this.parentNode).selectAll("path").size();
    // let allPath = d3.select(this.parentNode).selectAll("path");
    let path = document.getElementById(d.id+"-path");
    if(path){}
    else{
      d3.select(this.parentNode)
        .append("path")
        .attr("id",d.id+"-path")
        .attr("class","path")
        .attr("d",d3.line()([[d.x+linkWidth,d.y],[0,10]]));
    }
  })
  .on("end",function (d) {
    d3.select(this).attr("stroke-width",0);
    if(droppedId && droppedId !==d.id ){
      console.log(2);
      d3.select("#"+droppedId).attr("stroke-width",0);
      /*find end interface coordinate*/
      let droppedPosition =  findEndInterface(droppedId,upInterface,d.id.split("-")[0]);
      d3.select("#"+d.id+"-path").attr("d",d3.line()([[d.x+linkWidth,d.y],[d.x+linkWidth,d.y-30],[droppedPosition.x,d.y-30],[droppedPosition.x,d.y]]));
    }
  });

function InterfaceData(x1,x2,y1,y2,index){
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
  this.index = index;
}
function TransformCoor(eventX, eventY,index){
  // console.log("index:  "+ nodeIndex.indexOf(index));
  let x = eventX+10+nodeIndex.indexOf(index)*150;
  let y = eventY+30+50;
  return {"x":x,"y":y};/*return transformed coordinate*/
}
function JudgeScope(transPosition,up){
  let dropped = null;
  for(let item of up){
    // console.log(1+":  ",transPosition.x,transPosition.y);
    // console.log(2+":  ",item.x1,item.y1);
    // console.log(3+":  ",item.x2,item.y2);
    if(transPosition.x>item.x1 && transPosition.x<item.x2 && transPosition.y>item.y1 && transPosition.y<item.y2 ){
      dropped = item.index;
      break;
    }
  }
  return dropped; /*return the dropped interface's id*/
}
function findEndInterface(droppedIndex,up,draggedIndex){
  for(let item of up){
    if(droppedIndex === item.index ){
      /*transform coordinate for startInterface*/
      let x = item.x1+dragSpace;
      let y = item.y1+dragSpace+linkHeight/2;
      return transformEndInterface(draggedIndex,x,y);
    }
  }
}
/*transform coordinate for startInterface to back original coordinate*/
function transformEndInterface(draggedIndex,x,y){
  x = x-10-nodeIndex.indexOf(draggedIndex)*150;
  y = y-50-30;
  return {x:x, y:y};
}

/*n the up direction*/
let upInterface = [];
let x1 = 10+width/2- linkWidth/2-dragSpace;
let y1 = 30+50- linkHeight/2-dragSpace;
let x2 = x1+dragSpace+linkWidth;
let y2 =  y1+dragSpace+linkHeight;
for(let i= 0; i<nodeIndex.length; i++){
  let linkNode = new InterfaceData(x1+i*150,x2+i*150,y1,y2,nodeIndex[i]+"-"+0);
  upInterface.push(linkNode);
}
console.log(upInterface);



export {drag}
