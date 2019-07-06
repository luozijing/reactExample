import * as d3 from "d3"


function GeneratePathData(name, value){
  this.name = name;
  this.value = value;
}
function LinkView (linkGroup,pathData){
  pathData.forEach(function (item, index,) {
    // console.log(item.value);
    let Group =  linkGroup.append("g");
    Group
      .append("path")
      .datum(item)
      .attr("class","path")
      .attr("d",d3.line()(item.value));
    // Group
    //   .selectAll("circle")
    //   .data(item.value)
    //   .enter()
    //   .append("circle")
    //   .attr("r",2)
    //   .attr("fill","#59cc59")
    //   .attr("cx", (d)=>d[0])
    //   .attr("cy", (d)=>d[1])

  });

}

export {LinkView}
export {GeneratePathData}