import * as d3 from "d3"
import {GeneratePathData} from "./pathLink";
import {drag} from "./nodeDrag";
let width = 90, height = 70;
let linkWidth = 8, linkHeight = 8;
let interfacePosition = [[width/2-linkWidth/2,0-linkHeight],[width,height/2-linkHeight/2],[width/2-linkWidth/2,height],[0-linkWidth,height/2-linkHeight/2],];
function NodeView(nodeGroup, handleClick,nodeData){
  /*rect of node*/
  /*bind data to nodelist, return a nodeEnter; nodeEnter.data will be transferred to childNode when user enterNode*/
  let nodeEnter = nodeGroup.selectAll("g")
    .data(nodeData)
    .enter()
    .append("g")
    .attr("id", (d)=> d.name)
    .attr("transform", (d,i)=>{
        return "translate(" + ((i)*150) + "," +50 + ")" /*original coordinate*/
    });
   nodeEnter.append("rect")
    .attr("width",  (d)=>width)
    .attr("height", (d)=> height)
    .attr("class", "node")
    .on("click",(d)=>{handleClick(d);}); /*transfer a function for clickEvent*/

/*define link interface*/
      for(let i = 0; i < 4; i++){
        nodeEnter
          .append("rect")
          .attr('id', (d)=> d.name+"-"+i)
          .attr("x", interfacePosition[i][0])
          .attr("y", interfacePosition[i][1])
          .datum(function (d) {
            return {
              x: interfacePosition[i][0],
              y: interfacePosition[i][1],
              id: d.name+"-"+i
            }
          })
          .attr("width",8 )
          .attr("height", 8)
          .attr("class", "nodeInterface");
      }

  /*text of node*/
   nodeEnter.append("text")
      .attr("id",(d)=>d.name)
      .text((d,i,array)=> d.name)
      .attr("x",(d,i)=>width/2)
      .attr("y",(d,i)=>height/2)
      .attr("class", "node-text")
      .on("click",(d)=>{handleClick(d);});

}
/*draw delete icon*/
// nodeEnter.append("svg")
//     .attr("class", "deleteSvg")
//     .attr("width", 20)
//     .attr("height", 20)
//     .attr("viewBox", "0 0 1200 1200")
//     .attr("x", (d,i)=>i*140+width/2-10)
//     .attr("y",(d,i)=>60)
//     .append("path")
//     .attr("d", "M897.505882 60.235294v108.42353H126.494118V60.235294h192.752941l54.211765-54.211765h277.082352l54.211765 54.211765h192.752941zM180.705882 885.458824v-662.588236h662.588236v662.588236c0 30.117647-12.047059 54.211765-30.117647 78.305882-24.094118 24.094118-48.188235 30.117647-78.305883 30.117647H295.152941c-30.117647 0-54.211765-12.047059-78.305882-30.117647s-36.141176-48.188235-36.141177-78.305882z")
//     .attr("fill","#ccbb4a")
//     .attr("class","node-img")
//     .on("click",(d,i,node)=>{this.handleDeleteData(d)});

 const rectangleChart = (data,id,handleViewClick)=>{
  let svgWidth = 1200, svgHeight = 300;
  let {nodes, links} =data;
  let width = 100,height2 = 60,width2 = 100+30;
  let offSet = 10, space = 30;
  let pathStartX =  width2 + space + width;
  let pathStartY = height2+30;
  let controlDot = 4;
  let pathArray = [];

  /*path data*/
  nodes.forEach(function (item,index) {
    let tempArray  = [];
    for(let i = 0; i < 5; i++){
      if (item.name === "Pass-Unconditionally" || item.name === "impair"||item.name === "Drop-Unconditionally"){
        tempArray.push([0,0]);
      }
      else{
        tempArray.push([pathStartX+space/controlDot*i+(width+50)*(index-3),pathStartY+40]);
      }
    }
    let tempObj =  new GeneratePathData(item.name,tempArray);
    pathArray.push(tempObj);
  });

  d3.select("#"+id).selectAll("svg").remove();
  let  svg = d3.select("#"+id).append("svg").attr("width", svgWidth).attr("height",svgHeight).attr("transform","translate(150,10)");

  /*define svg arrow*/
  svg.append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("orient", "auto")
    .attr("preserveAspectRatio", "none")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 5) /*to define the link position of marker*/
    .attr("refY", 5)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("markerUnits","userSpaceOnUse")
    .append("path")
    .attr("d", "M0,0 L0,10 L10,5 z")
    .attr("fill","#67f91f");

  svg.append("rect").attr("width","1170").attr("height",250).attr("fill","white");
  /*draw nodeComponent*/
  /*here is problem of coordinate*/
  const  nodeGroup = svg
    .append("g").attr("transform","translate(10,30)");
  NodeView(nodeGroup ,handleViewClick, nodes );

  /*define drag event*/
  d3.selectAll(".nodeInterface")
    .call(drag);
};
export {rectangleChart}