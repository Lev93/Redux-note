import axios from 'axios';
import React from 'react';
import update from 'immutability-helper';
import Item from './Item';
import routes from './routes';


class TodoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', tasks: [] };
  }

  handleOnChange = (e) => {
		e.preventDefault();
		this.setState({ value: e.target.value });
	}

  handleSubmit = async (e) => {
		e.preventDefault();
		const text = this.state.value;
    this.setState({ value: '' });
    const res = await axios.post('/tasks', {text});
   
    const oldtasks = this.state.tasks;
    oldtasks.push(res.data)
    this.setState({ tasks: oldtasks });
	}

  componentDidMount= async() => {
    const res = await axios.get(routes.tasksPath());
    this.setState({ tasks: res.data });
  }

  changeTaskState = (id) => async (e) => {
    e.preventDefault();
    const item = this.state.tasks.filter(item => item.id === id);
    const index = this.state.tasks.findIndex(item => item.id === id);
    console.log(index)
    if (item[0].state === 'active') {
      const res = await axios.patch(routes.finishTaskPath(id));
      const oldtasks = this.state.tasks;
      oldtasks[index].state = "finished";
     
      this.setState({ tasks: oldtasks });
    } else {
      const res = await axios.patch(routes.activateTaskPath(id));
      const oldtasks = this.state.tasks;
      oldtasks[index].state = "active";
      
      this.setState({ tasks: oldtasks });
    }
  }
 
  renderactive() {
    const { tasks } = this.state;
    const active = tasks.filter(({state}) => state === "active").reverse();
    return <div className="todo-active-tasks">
      {active.map(task => <Item text={task.text} id={task.id} change={this.changeTaskState} key={task.id}/>)}
    </div>
  }
  renderfinished() {
    const { tasks } = this.state;
    const finished = tasks.filter(({state}) => state === "finished");
    return <div className="todo-finished-tasks">
      {finished.map(task => <Item text={task.text} id={task.id} change={this.changeTaskState} state={task.state} key={task.id}/>)}
    </div>
  }

  render() {
    const { value, tasks } = this.state;
    const active = tasks.filter(({state}) => state === "active").reverse();
    const finished = tasks.filter(({state}) => state === "finished").reverse();
    return <div>
      <div className="mb-3">
        <form className="todo-form form-inline mx-3" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" required className="form-control mr-3" placeholder="I am going..." onChange={this.handleOnChange} value={value}/>
          </div>
          <button type="submit" className="btn btn-primary">add</button>
        </form>
      </div>
      { active.length > 0 ? this.renderactive() : null }
      { finished.length > 0 ? this.renderfinished() : null }
    </div>
  }
}
export default TodoBox;