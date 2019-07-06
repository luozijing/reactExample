import React from "react"
import * as d3 from "d3"
import {Button} from  "react-bootstrap"
import {Form} from "react-bootstrap"
import {Modal} from "react-bootstrap"
import {DropdownButton} from 'react-bootstrap'
import {Dropdown} from 'react-bootstrap'
import "../public/CSS/d3Example.import.css"
import {LinkView} from "../public/JS/pathLink"
import {GeneratePathData} from "../public/JS/pathLink"
import {NodeView} from "../public/JS/rectNode"
import {drag} from "../public/JS/nodeDrag"


class ModalViewClass extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inputValue: null
    }
  }
  handleChange = (e)=>{
    this.setState({
      inputValue:e.target.value
    })
  };
  handleChangeData = ()=>{
    this.props.onChangeData({id:this.props.name,data:this.state.inputValue});
  };
/*after component receive a new props*/
  componentWillReceiveProps(newProps) {
    this.setState({inputValue: newProps.value})
  }
  render(){
    return (
        <Modal show = {this.props.show} size = "lg" centered aria-labelledby="contained-modal-title-vcenter" onHide={this.props.onHide} >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Change data to update
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              < Form.Group controlId = "inputValue">
                <Form.Label>
                  name:{this.props.name}
                </Form.Label>
                <Form.Control type = "text" value = {this.state.inputValue?this.state.inputValue:"please input value"} onChange = {this.handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant = "secondary" onClick = {this.props.onHide}>Close</Button>
            <Button variant = "primary"  onClick = {this.handleChangeData}>changeData</Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

class D3Example extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: false,
      name: null,
      value: null
    }
  }
  componentDidMount(){
    this.rectangleChart(this.props.data,this.props.id);
  }
  componentDidUpdate(){
    this.rectangleChart(this.props.data,this.props.id);
  }
  handleViewClick= (name)=>{
    this.setState({
      show: true,
      name: name.name
    })
  };
  handleDeleteData= (name)=>{
    this.props.onDeleteData(name);
  };
  handleChangeData = (data)=>{
    if(data.data){
      this.props.onChangeData(data);
    }
    this.handleHide();
  };
  handleHide = ()=>{
    this.setState({
      show: false
    })
  };
  rectangleChart = (data,id)=>{
    let svgWidth = 1200, svgHeight = 300;
    let {nodes, links} =data;
    let width = 100,height2 = 60,width2 = 100+30;
    let offSet = 10, space = 50;
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
    let  svg = d3.select("#"+id).append("svg").attr("width", svgWidth).attr("height",svgHeight).style("margin","10 auto 0 150");

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
        .attr("fill","#57cc1a");

    svg.append("rect").attr("width","1200").attr("height",300).attr("fill","white");
    /*draw line*/
    /*coordinate offset (10,-10)*/
    /*here is problem of coordinate*/
    // let linkGroup = svg.append("g").attr("transform","translate(10,-10)");
    // LinkView(linkGroup, pathArray);

    /*coordinate offset (10,10)*/
    const  nodeGroup = svg
      .append("g").attr("transform","translate(10,30)");
    NodeView(nodeGroup ,this.handleViewClick, nodes );

    /*define drag event*/
    d3.selectAll(".nodeInterface")
      .call(drag);
  };
  render(){
    return(
          <div id = {this.props.id}>
            <ModalViewClass
              show = {this.state.show}
              onHide = {this.handleHide}
              onChangeData = {this.handleChangeData}
              name ={this.state.name}
              value = {this.state.value}
            />
          </div>
    )
  }
}

class D3Parent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: graph,
      id: "content",
    }
  }
  handleChangeData  = (data)=> {
   this.changeData(data);
  };
  handleDeleteData  = (name)=> {
    this.deleteData(name);
  };
  changeData = (data2)=>{
    let {id, data} =data2;
    this.state.data.nodes.forEach((value) => {  //两种方式，一种可更改数据（无法保存历史和先前状态），另一种不可更改数据
      if (value.name === id) {
        value.name = data;
        // return Object.assign({}, value, {name: changeData,})
      }
      // else{return value}
    });
    // graph2.links = this.state.data.links.map((value)=>{
    //   let newLink = {};
    //   if(value.source.name === id){
    //     newLink = Object.assign({},value,{source: changeData})
    //     return newLink;
    //   }
    //   else if(value.target.name === id){
    //     newLink = Object.assign({},value,{target: changeData})
    //     return newLink;
    //   }
    //   else{
    //     return value
    //   }
    // });
    // console.log(graph2);
    this.setState({
      data: this.state.data
    })
};
  deleteData = (name)=>{
    let index = this.state.data.nodes.forEach((value,index)=>{
      if(value.name === name){
        return index;
      }
    });
    this.state.data.nodes.splice(index,1);
    console.log(this.state.data);
    this.setState({
      data: this.state.data
    })
  };
  render(){
    return (
        <div className = "board">
          <div className = "board-title">
            <h4>Flow0</h4>
          </div>
          <div >
            <D3Example
              data = {this.state.data}
              id = {this.state.id}
              onChangeData = {this.handleChangeData}
              onDeleteData = {this.handleDeleteData}
            />
          </div>
          <div className="board-content">
            <DropdownButton id="dropdown-basic-button" title="filter" className = "border-content-button" variant = "Secondary" >
              <Dropdown.Item href="#/action-1">Pass</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Fail</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
    )
  }
}

let graph = {"nodes":["Pass-Unconditionally","impair","Drop-Unconditionally","Policing","Drop","Misorder","Lattency","Shaping","Duplicate","Corruption"],
  "links":[{"source":1,"target":3},{"source":3,"target":4},{"source":4,"target":5},{"source":5,"target":6},{"source":6,"target":7},{"source":7,"target":8},{"source":8,"target":9}]};
graph.nodes = graph.nodes.map(function (d){
  return { name: d };
});
graph.links = graph.links.map(function (d){
  d.source = graph.nodes[d.source];
  d.target = graph.nodes[d.target];
  return d
});

export default D3Parent