// ES6版本
import { observable } from "mobx";
class Todo {
    id = Math.random();
    @observable title = "";
    @observalbe finished = false;
}
// ES5版本
import { observalbe, decorate } from "mobx";
class Todo {
    id = Math.random();
    title = "";
    finished = false;
}
decorate(Todo, {
    title: observalbe,
    finished: observalbe
})
class TodoList {
    @observalbe todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
@observer
class TodoListView extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.todoList.todos.map(todo=><TodoView todo={todo} key={todo.id} />)}
                    Task left : {this.props.todoList.unfinishedTodoCount}
                </ul>
            </div>
        )
    }
}
const TodoView = observer(({ todo }) => {
    <li>
        <input type="checkbox" checked={todo.finished} onClick={()=>todo.finished=!todo.finished} /> {todo.title}
    </li>
});
const store = new TodoList();
ReactDOM.render(<TodoListView todoList={tore} />, document.getElementById('mount'));
// 自定义 reactions
autorun(() => {
    console.log("Tast left:" + todos.unfinishedTodoCount);
})
// Actions (动作)
store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code")
)
// 定义状态并使其可观察
import { observable } from 'mobx';
var appState = observable({
    timer: 0
});
// 创建视图以响应状态的变化
import { observer } from 'mobx-react';
@observer
class TimerView extends React.Component {
    render() {
        return (
            <button onClick={this.onReset.bind(this)}>
                Seconds passed:{this.props.appState.timer}
            </button>
        );
    }

    onReset() {
        this.props.appState.resetTimer();
    }
};

ReactDOM.render(<TimerView appState={ appState } />,document.body);
// 更改状态
appState.resetTimer = action(function reset() {
    appState.timer = 0;
});

setInterval(action(function tick() {
    appState.timer += 1;
}),1000);
// Derivations(衍生)
// Action(动作) => State(状态) => Views(视图)