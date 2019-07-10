import * as d3 from "d3";

const boardBackGround = (domData,domId)=>{
  const background =  d3.select("#"+domId).append("svg")
    .attr("width","1300")
    .attr("height","300px");
  background
    .append("rect")
    .attr("class","boardBackground")
    .attr("width", "100%")
    .attr("height", "100%");
  background.append("text")
    .text("FLOW 0")
    .attr("x",10)
    .attr("y",40)
    .attr("font-size",20);
};

const boardAside = (domData,domId)=>{
  const backAside =  d3.select("#"+domId).append("svg")
    .attr("width","100px")
    .attr("height","300px")
    .attr("transform",  "translate(" + 70 + "," +75 + ")");
  backAside
    .append("rect")
    .attr("class","boardAside")
    .attr("width", "60")
    .attr("height", "90");
  backAside
    .append("svg")
    .attr("width","25px")
    .attr("height","30px")
    .attr("viewBox","0 0 1024 1024" )
    .append("path")
    .attr("d", "M908.6 134.7c6.5 15.5 3.8 28.8-8 39.7L620.9 454.1V875c0 15.8-7.4 27.1-22.1 33.5-4.9 2-9.7 2.9-14.2 2.9-10.3 0-18.7-3.6-25.5-10.7L413.8 755.2c-7.2-7.2-10.7-15.7-10.7-25.5V454.1L123.4 174.4c-11.7-11-14.3-24.2-8-39.7 6.5-14.8 17.5-22.1 33.5-22.1H875c16-0.1 27.2 7.3 33.6 22.1z")
    .attr("x", 10)
    .attr("y",10)
    .attr("fill","#373737");
  backAside
    .append("text")
    .text("filter")
    .attr("x",24)
    .attr("y",20)
    .attr("font-size",16);
  backAside
    .append("text")
    .text("Pass")
    .attr("x",24)
    .attr("y",52)
    .attr("fill", "green")
    .attr("font-size",18)
    .attr("class", "board-text")
    .on("click", function () {
      d3.select(this.parentNode)
        .append("path")
        .attr("id","passPath")
        .attr("class","path")
        .attr("d",d3.line()([[58,50],[80,50]]));
    });
  backAside
    .append("text")
    .text("Fail")
    .attr("x",24)
    .attr("y",82)
    .attr("fill", "red")
    .attr("font-size",18);

};

const boardStart = (domData,domId)=>{
  const start =  d3.select("#"+domId).append("svg")
    .attr("width","100px")
    .attr("height","200px");
  start
    .append("path")
    .attr("class","path")
    .attr("d",d3.line()([[4,124],[64,124]]));
  let str = "incoming traffic".split(" ");
  let text = start
    .append("text")
    .attr("x",5)
    .attr("y",85);
  text
    .selectAll("tspan")
    .data(str)
    .enter()
    .append("tspan")
    .attr("x",text.attr("x"))
    .attr("dy","1em")
    .attr("font-size","15px")
    .text(function (d) {
      return d
    });

};

export {boardBackGround}
export {boardAside}
export {boardStart}