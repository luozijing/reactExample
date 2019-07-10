import React from "react"
import {Button,Form,Modal,DropdownButton,Dropdown} from  "react-bootstrap"
import "../public/CSS/d3Example.import.css"
import {rectangleChart} from "../public/JS/rectNode"
import {boardAside,boardStart,boardBackGround} from "../public/JS/borderBackgroundAside"
import {graph} from "../public/JS/nodeData";

class ModalViewDropForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: this.props.name
    }
  }
  handleSelect = (eventKey, event)=>{
    this.setState({
      value:event.target.textContent.trim()
    })
  };
  handleChangeData = ()=>{
    this.props.onChangeData({id:this.props.name,data:this.state.value});
  };
  /*after component receive a new props*/
  componentWillReceiveProps(newProps) {
    this.setState({value: newProps.name})
  }
  render(){
    return (
      <Modal show = {this.props.show} size = "lg" centered aria-labelledby="contained-modal-title-vcenter" onHide={this.props.onHide} >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            select different way to transform packageData
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            < Form.Group controlId = "inputValue">
              <Form.Label>
                selectedValue:{this.state.value}
              </Form.Label>
              <DropdownButton
                id="dropdown-basic-button"
                title= {this.state.value}
                variant = "drug-button"
                className = "drugButton"
                onSelect = {this.handleSelect} >
                <Dropdown.Item href="#/action-1" >byPass</Dropdown.Item>
                <Dropdown.Item href="#/action-2">token</Dropdown.Item>
                <Dropdown.Item href="#/action-3">drop</Dropdown.Item>
              </DropdownButton>
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

class ModalViewInputForm extends React.Component{
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
  /*dom node were rendered*/
  componentDidMount(){
   rectangleChart(this.props.data,this.props.id,this.handleViewClick);
  }
  /*dom node were updated*/
  componentDidUpdate(){
    rectangleChart(this.props.data,this.props.id,this.handleViewClick);
  }
  handleViewClick= (value)=>{
    this.setState({
      show: true,
      name: value.name
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
  JudeFormType = (name)=>{
    if(name === "byPass" || name === "token" || name === "drop") {
      return (
        <div id={this.props.id}>
          <ModalViewDropForm
            show={this.state.show}
            onHide={this.handleHide}
            onChangeData={this.handleChangeData}
            name={this.state.name}
          />
        </div>
      )
    }
      else{
        return(
          <div id = {this.props.id}>
            <ModalViewInputForm
              show = {this.state.show}
              onHide = {this.handleHide}
              onChangeData = {this.handleChangeData}
              name ={this.state.name}
              value = {this.state.value}
            />
          </div>
        )
      }
  };

  render(){
    return(
          <div id = {this.props.id}>
            {this.JudeFormType(this.state.name)}
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

  componentDidMount(){
   boardBackGround(null,"boardBackground");
   boardAside(null,"boardAside");
   boardStart(null,"boardStart");
  }
  /*dom node were updated*/
  componentDidUpdate(){
    // boardBackGround(null,"boardBackground");
    // boardAside(null,"boardAside");
  }

  render(){
    return (
        <div className = "board" id = "board">
          <div className="board-back" id="boardBackground">
          </div>
          <div className="board-aside" id="boardAside">
          </div>
          <div className="board-start" id="boardStart">
          </div>
          <div className="board-content">
            <D3Example
              data = {this.state.data}
              id = {this.state.id}
              onChangeData = {this.handleChangeData}
              onDeleteData = {this.handleDeleteData}
            />
          </div>
        </div>
    )
  }
}

export default D3Parent