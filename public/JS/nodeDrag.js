import * as d3 from "d3"

let drag = d3.drag().on("drag",function (d) {
  let that = this;
  d.dx = d3.event.x;
  d.dy = d3.event.y;
  d3.select(this.parentNode)
    .select("#"+d.id+"-path")
    .attr("d",d3.line()([[d.x,d.y],[d.dx,d.dy]]))
  // update(that,d);
})
  .on("start",function (d) {
    console.log(d);
    d3.select(this).attr("stroke-width",1).attr("stroke","red");
    let pathNumber = d3.select(this.parentNode).selectAll("path").size();
    // let allPath = d3.select(this.parentNode).selectAll("path");
    let path = document.getElementById(d.id+"-path");
    console.log(path);
    if(path){

    }
    else{
      d3.select(this.parentNode)
        .append("path")
        .attr("id",d.id+"-path")
        .attr("class","path")
        .attr("d",d3.line()([[d.x,d.y],[0,10]]));
    }
  })
  .on("end",function (d) {
    d3.select(this).attr("stroke-width",0);
  });

function update(selectedGroup,selectedData){
  d3.select(this)
    .append("g")
    .append("path")
    .attr("class","path")
    .attr("d",d3.line()([[0,1],[0,10]]));
  // d3.select(selectedGroup).select("circle").attr("cx",(d)=>{
  //   return d.x;
  // })
  //   .attr("cy", (d)=>{
  //     return d.y;
  //   })
  //   .attr("stroke","red")
  //   .attr("stroke-width", 1.5);
  // let selectedLine =  d3.selectAll("line").filter((d)=>{return d === selectedData});
  // selectedLine
  //   .attr("x2",(d)=>d.x)
  //   .attr("y2",(d)=>d.y);
}

export {drag}