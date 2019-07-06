import React from 'react';
import '../public/bootstrap-3.3.7-dist/css/bootstrap.css';
import '../public/CSS/timeApp.import.css';
import {countTimeDiff} from "../public/JS/time";
import uuid from "uuid"


class TimersDashboards extends  React.Component{
    constructor(props) {
      super(props);
      this.state = {
        task: [
          {
            title: "finish a demo",
            subTitle: "react component",
            timeRecord: 0,
            id: uuid.v4(),
            timeStart: Date.now()
          },
          {
            title: "finish a animate",
            subTitle: "ES6 demo of buble",
            timeRecord: 0,
            id: uuid.v4(),
            timeStart: Date.now()
          },
        ]
      };
    }
    handleCreateEvent = (taskValues)=>{
      let values = this.createTask(taskValues);
      this.setState({
        task: this.state.task.concat(values)
      })
    };
    handleEditEvent = (editValues)=>{
      this.update(editValues);
    };
    handleDeleteEvent = (id)=>{
      this.delete(id);
    };
    handleBeginEvent = (id)=>{
      this.setState({
        task: this.state.task.map((item)=>{
          if(item.id === id){
            return Object.assign({},item,{
              timeStart: Date.now(),
            })
          }
          else{
            return item
          }
        })
      })
    };
  handleStopEvent = (id)=>{
    this.setState({
      task: this.state.task.map((item)=>{
        if(item.id === id){
          console.log(Date.now()-item.timeStart);
          return Object.assign({},item,{
            timeRecord: Date.now()-item.timeStart+item.timeRecord,
            timeStart: null,
          })
        }
        else{
          return item
        }
      })
    })
  };
    createTask = (taskValues)=>{
      if(!taskValues.id){
        taskValues.id = uuid.v4();
        taskValues.timeRecord = 0;
        taskValues.timeStart = Date.now();
        return taskValues
      }
      else{
        return taskValues
      }
    };
    update = (editValues)=>{
      let values = this.createTask(editValues);
      let newValues = this.state.task.map((item)=>{
        if(item.id === values.id){
          return Object.assign({},item,values)
        }
        else{
          return item
        }
      });
      this.setState({
        task: newValues
      })
    };
  delete = (id)=>{
    this.setState({
      task: this.state.task.filter((item)=>item.id !== id)
    })
  };
    render(){
        return (
                    <div className= "panel panel-default timerDash">
                        <div className= "panel-heading  text-center" >
                            <h3>TimersDashboards</h3>
                        </div>
                        <div className="panel-body text-center ">
                            <EditableTimerList
                                task = {this.state.task}
                                onSubmit = {this.handleEditEvent}
                                onDelete = {this.handleDeleteEvent}
                                onBegin = {this.handleBeginEvent}
                                onStop = {this.handleStopEvent}
                            />
                        </div>
                        <div className="panel-footer">
                            <TimerForm
                            onSubmit = {this.handleCreateEvent}
                            />
                        </div>
                    </div>
        )
    }
}

class EditableTimerList extends React.Component{
    render(){
        return(
            <div>
                <ul>
                  {this.props.task.map((taskValue)=> <li  key = {taskValue.id}>
                    <EditableTimer
                      title = {taskValue.title}
                      subTitle = {taskValue.subTitle}
                      timeRecord = {taskValue.timeRecord}
                      id = {taskValue.id}
                      timeStart = {taskValue.timeStart}
                      onSubmit = {this.props.onSubmit}
                      onDelete = {this.props.onDelete}
                      onBegin = {this.props.onBegin}
                      onStop = {this.props.onStop}
                  /></li>)}
                </ul>
            </div>
        )
    }
}

class EditableTimer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isForm: false,
    }
  }
  handleEditEvent = ()=>{
    this.setState({
      isForm: true
    })
  };
  handleSubmitEvent = (editValue)=>{
    this.props.onSubmit(editValue);
    this.close();
  };
  handleCloseEvent = ()=>{
    this.close();
  };
  close = ()=>{
    this.setState({
      isForm: false
    })
  };
    render(){
      const { title, subTitle, timeRecord, id, timeStart} = this.props;
      const form = () =>  <Form
          title = {title}
          subTitle = {subTitle}
          id = {id}
          onSubmit = {this.handleSubmitEvent}
          onClose =  {this.handleCloseEvent}
      />;
      const time = () =>  <Timer
          title = {title}
          subTitle = {subTitle}
          timeRecord = {timeRecord}
          id = {id}
          timeStart = {timeStart}
          onEdit = {this.handleEditEvent}
          onDelete = {this.props.onDelete}
          onBegin = {this.props.onBegin}
          onStop = {this.props.onStop}
      />;
            return(
                this.state.isForm
                    ? form()
                    : time()
            )
    }
}

class Timer extends React.Component{
  handleEditEvent = ()=>{
    this.props.onEdit();
  };
  handleDeleteEvent = ()=>{
    this.props.onDelete(this.props.id);
  };
  componentDidMount(){
    this.forceUpdateInterval = setInterval(()=>this.forceUpdate(),50);
  }
  componentWillMount(){
    clearInterval(this.forceUpdateInterval);
  }
  handleStopEvent =()=>{
    this.props.onStop(this.props.id);
  };
  handleBeginEvent =()=>{
    this.props.onBegin(this.props.id);
  };
    render(){
      const {title, subTitle, timeRecord,timeStart} = this.props;
      const time = countTimeDiff(timeStart,timeRecord);
        return(
            <div className="panel panel-default timer">
                <div className="panel-body">
                        <h4 className="text-left">
                            {title}
                            <span className="glyphicon glyphicon-trash"   onClick = {this.handleDeleteEvent}  > </span>
                            <span className="glyphicon glyphicon-cog" onClick = {this.handleEditEvent}> </span>
                            </h4>
                        <h6 className="text-left">{subTitle}</h6>
                        <div className="text-center">{time}</div>
                  <TimerActionButton
                    isTiming = {!!timeStart}
                    onBegin = {this.handleBeginEvent}
                    onStop = {this.handleStopEvent}
                  />
                </div>
            </div>
        )
    }
}

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title || "",
      subTitle: this.props.subTitle || ""
    }
  }
  titleChange = (e)=> {
    this.setState({
      title: e.target.value
    })
  };
  subTitleChange = (e)=> {
    this.setState({
      subTitle: e.target.value
    })
  };
  handleSubmitEvent = ()=>{
    this.props.onSubmit({
      title: this.state.title,
      subTitle: this.state.subTitle,
      id:this.props.id,
    });
  };
  handleCloseEvent = ()=>{
    this.props.onClose();
  };
    render(){
      const id = this.props.id;
      const editButton = id? "update":"create";
        return(
            <div className="panel panel-default timerForm">
                <div className="panel-body">
                <form action="">
                    <div className="form-group " >
                        <div className="text-left timerForm-input">
                            <label htmlFor="title"  >title</label>
                            <input type="text" className="form-control" id = "title"  value={this.state.title} onChange={this.titleChange}/>
                        </div>
                        <div className="text-left timerForm-input">
                            <label htmlFor="subtitle">subtitle</label>
                            <input type="text" className="form-control" id = "subtitle"  value={this.state.subTitle} onChange={this.subTitleChange}/>
                        </div>
                        <div className="text-center timerForm-buttonGroup ">
                            <button type="button" className="btn btn-default"  onClick = {this.handleSubmitEvent}>{editButton}</button>
                            <button type="button" className="btn btn-default" onClick = {this.handleCloseEvent}>cancel</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


class TimerForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
    }
  }
  addTask = ()=>{
    this.setState({
      isOpen: true,
    })
  };
  handleSubmitEvent = (taskValue)=>{
    this.props.onSubmit(taskValue);
    this.setState({
      isOpen:false
    })
  };
  handleCloseEvent = ()=>{
    this.setState({
      isOpen:false
    })
  };
    render(){
        if(this.state.isOpen){
            return <Form
              onSubmit = {this.handleSubmitEvent}
              onClose = {this.handleCloseEvent}
            />
        }
        return(
            <div className="text-center">
                <button type="button" className="btn btn-default"  onClick= {()=>{this.addTask()}}>  <span className="glyphicon glyphicon-plus"></span></button>
            </div>
        )
    }
}

class TimerActionButton extends React.Component{
  render(){
    const startButton= ()=>{
      return(
          <button
              type = "button"
              className="btn btn-default timer-button"
              onClick= {this.props.onBegin}
          >
            Begin
          </button>
      )
    };
    const stopButton= ()=>{
      return(
          <button
              type = "button"
              className="btn btn-default timer-button"
              onClick= {this.props.onStop}
          >
            Stop
          </button>
      )
    };
    return(
        this.props.isTiming
        ?stopButton()
        :startButton()
    )
  }
}


export default TimersDashboards

