import * as d3 from "d3"
let width = 100, height = 80,height2 = 60,width2  =130;
let interfacePosition = [[width/2-5,0-10],[width,height/2-5],[width/2-5,height],[0-10,height/2-5],];
let interfacePosition2 = [[width2,height2/2-5],[0-10,height2/2-5],];
function NodeView(nodeGroup, handleClick,nodeData){
  /*rect of node*/
  /*bind data to nodelist, return a nodeEnter; nodeEnter.data will be transferred to childNode when user enterNode*/
  let nodeEnter = nodeGroup.selectAll("g")
    .data(nodeData)
    .enter()
    .append("g")
    .attr("id", (d)=> d.name)
    .attr("transform", (d,i)=>{
      if (d.name === "Pass-Unconditionally" ){
        return "translate(" + 0 + "," + 0 + ")"
      }
      else if (d.name === "impair" ){
        return "translate(" + 0 + "," + height2 + ")"
      }
      else if (d.name === "Drop-Unconditionally" ){
        return "translate(" + 0 + "," + height2*2 + ")"
      }
      else{
        return "translate(" + ((i-2)*150+30) + "," +50 + ")"
      }
    });
   nodeEnter.append("rect")
    .attr("width",  (d)=>{
      if (d.name === "Pass-Unconditionally" || d.name === "impair"||d.name === "Drop-Unconditionally"){
        return width+30;
      }
      else{
        return width;
      }
    })
    .attr("height", (d)=>{
      if (d.name === "Pass-Unconditionally" || d.name === "impair"||d.name === "Drop-Unconditionally"){
        return height2;
      }
      else{
        return height;
      }
    })
    .attr("class", "node")
    .on("click",(d)=>{handleClick(d);}); /*transfer a function for clickEvent*/

/*define link interface*/ 
     let nodeEnter1 =  nodeEnter.filter(function (d) {
        if (d.name === "Pass-Unconditionally" || d.name === "impair"||d.name === "Drop-Unconditionally"){
          return true;
        }
        else{
          return false;
        }
      });
  let nodeEnter2 =  nodeEnter.filter(function (d) {
    if (d.name === "Pass-Unconditionally" || d.name === "impair"||d.name === "Drop-Unconditionally"){
      return  false;
    }
    else{
      return true;
    }
  });
      for(let i = 0; i < 4; i++){
        nodeEnter2
          .append("rect")
          .attr('id', (d)=> d.name+i)
          .attr("x", interfacePosition[i][0])
          .attr("y", interfacePosition[i][1])
          .datum(function (d) {
            return {
              x: interfacePosition[i][0],
              y: interfacePosition[i][1],
              id: d.name+i
            }
          })
          .attr("width",10 )
          .attr("height", 10)
          .attr("class", "nodeInterface");
      }
  for(let i = 0; i < 2; i++){
    nodeEnter1
      .append("rect")
      .attr('id', (d)=> d.name+i)
      .attr("x",interfacePosition2[i][0])
      .attr("y",interfacePosition2[i][1])
      .datum(function (d) {
        return {
          x: interfacePosition2[i][0],
          y: interfacePosition2[i][1],
          id: d.name+i
        }
      })
      .attr("width",10 )
      .attr("height", 10)
      .attr("class", "nodeInterface");
  }

  /*text of node*/
   nodeEnter.append("text")
      .attr("id",(d)=>d.name)
      .text((d,i,array)=>{
        if (d.name.indexOf("-") !== -1){
         return null;
        }
        else{
          return d.name;
        }
      })
      .attr("x",(d,i)=>{
        if (d.name === "Pass-Unconditionally" || d.name === "Drop-Unconditionally"||d.name === "impair" ){
          return(width+30)/2;
        }
        else{
          return width/2;
        }
      })
      .attr("y",(d,i)=>{
        if (d.name === "Pass-Unconditionally" ){
          return height2/2-15;
        }
        else if ( d.name === "impair"){
          return height2/2;
        }
        else if (d.name === "Drop-Unconditionally"){
          return height2/2-20;
        }
        else{
          return height/2;
      }
      })
      .attr("class", "node-text")
      .on("click",(d)=>{handleClick(d);});
  let str2 = "Drop-Unconditionally".split("-");
  d3.select("#Drop-Unconditionally").select("text").selectAll("tspan")
    .data(str2)
    .enter()
    .append("tspan")
    .attr("x", (width2)/2)
    .attr("dy","1em")
    .attr("class","tspan")
    .text((d)=> d);
  let str3 = "Pass-Unconditionally".split("-");
  d3.select("#Pass-Unconditionally").select("text").selectAll("tspan")
    .data(str3)
    .enter()
    .append("tspan")
    .attr("x", (width2)/2)
    .attr("dy","1em")
    .attr("class","tspan")
    .text((d)=> d);
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
export {NodeView}