import React from 'react';
import {Button} from  "react-bootstrap"
import  "../public/CSS/button.import.css"



class BootStrapExampleIsLoading extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false
    }
  }
  handleClick = ()=>{
    this.setState({
     isLoading: true
    }, ()=>{simulateNetworkRequest().then(()=>{this.setState({isLoading:false})})}
  );
  };

  render(){
    let isLoading = this.state.isLoading ?"Loading...":"LoadingState";
    return (
        <div>
          <Button
              className = "mb-5"
              variant="flat"
              disabled = {this.state.isLoading}
              onClick = {this.handleClick}
              size="xxl"
          >
            {isLoading}
            </Button>
        </div>
    )
  }
}

function simulateNetworkRequest() {
  return new Promise((resolve => setTimeout(resolve,2000)));
}

export default BootStrapExampleIsLoading