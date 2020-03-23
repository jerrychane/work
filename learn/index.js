// ES6版本
import {observable} from "mobx";
class Todo {
    id = Math.random();
    @observable title = "";
    @observalbe finished = false;
}
// ES5版本
import {observalbe,decorate} from "mobx";
class Todo {
    id = Math.random();
    title = "";
    finished = false;
}
decorate(Todo,{
    title:observalbe,
    finished:observalbe
})
class TodoList {
    @observalbe todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo=>!todo.finished).length;
    }
}

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observe} from 'mobx';
@observe
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
const TodoView = observe(({todo})=>{
    <li>
        <input type="checkbox" checked={todo.finished} onClick={()=>todo.finished=!todo.finished} /> {todo.title}
    </li>
});
const store = new TodoList();
ReactDOM.render(<TodoListView todoList={tore} />,document.getElementById('mount'));