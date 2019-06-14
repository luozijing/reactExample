import React from 'react';
import '../bootstrap-3.3.7-dist/css/bootstrap.css';


class TimersDashboards extends  React.Component{
    render(){
        return (
                <div className="row">
                    <div className= "panel panel-default">
                        <div className= "panel-heading  text-center" >
                                <h3>TimersDashboards</h3>
                        </div>
                        <div className="panel-body text-center ">
                            <EditableTimerList
                            />
                        </div>
                        <div className="panel-footer">
                            <TimerForm />
                        </div>
                    </div>
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
                    <li>
                        <EditableTimer isForm = {true}
                                       ss = {1}
                    />

                    </li>

                </ul>
            </div>
        )
    }
}

class EditableTimer extends React.Component{
    render(){
        if(this.props.ss){
            return(
                <div>
                    xcxxx
                </div>
            )
        }
        else{
            return(
                <div>
                        qccc
                </div>
            )
        }

    }
}

class TimerForm extends React.Component{
    render(){
        return(
            <div>

            </div>
        )
    }
}

export default TimersDashboards

