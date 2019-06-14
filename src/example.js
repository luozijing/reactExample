import React from 'react';
import './CSS/example.css';

class Square extends  React.Component {
    render(){
        return (
            <button
                className="square"
                onClick={()=>{this.props.onClick()}}
            >
                {this.props.value}
            </button>

        )
    }
}

class Board extends React.Component{
   renderSquare(i){
        return  (
            <Square
                value = {this.props.condition[i]}  //这里的this指向
                onClick = {()=>{this.props.onClick(i)}} //这里的this指向
            />
        )
    }
    render(){
        return (
            <div>
                <div className="status">
                    {this.props.status}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state={  //state里面的内容则更新view
            history: [{condition: new Array(9).fill(null)}],
            next: true,
            number: 0
        }
    }
    handleClick (i) {
        const history = this.state.history.slice(0,this.state.number+1);
        const squares = history[history.length-1].condition.slice(); //imutable，不能引用
        let winner = this.caculateWinner(squares);
        if(winner || squares[i]){return;}
        squares[i] = this.state.next?"X":"O";
        history.push({condition:squares});
        this.setState({
            history: history,
            next:  !this.state.next,
            number:  history.length-1
        });
        console.log(this.state.history);
    }
    caculateWinner(condition) {
        let a = [
            [0, 1, 2],
            [3, 4, 6],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i of a){
            let [a,b,c] = i;
            if(condition[a] &&  condition[a] === condition[b] &&  condition[a] === condition[c]){
                return condition[a];
            }
        }
        return null;

    }
    jump(index){
            this.setState({
                 number: index,
                 next: index%2 === 0,
            });
    }

    render(){ //render方式默认api，默认里面的this是component
        const history = this.state.history.slice(0,this.state.number+1);
        const current = history[this.state.number].condition;
        let status = 'Next player:'+( this.state.next ? 'X' : 'O');
        const winner = this.caculateWinner(current);
        if(winner){status =  "winners"+winner;}
        const move = this.state.history.map((value,index)=>{
            const dect = index? ("回到第"+index):("回到初始状态");
            return (<li key = {index}>
                <button onClick={()=>this.jump(index)}>{dect}</button>
            </li>)
        });
        return (
            <div className={"game"}>
                <div className={"game-board"}>
                    <Board
                        condition = {current}
                        status = {status}
                        onClick = {(i)=>{this.handleClick(i)}}
                    />
                </div>
                <div className={"game-info"}>
                    <div>历史记录</div>
                    <ol>{move}</ol>
                </div>
            </div>
        )
    }
}

export default Game

