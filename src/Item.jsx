/* eslint-disable react/prefer-stateless-function, jsx-a11y/anchor-is-valid */

import React from 'react';

class Item extends React.Component {
	render() {
    const { text, id, change, state } = this.props;
    if (state === "finished") {
      return <div className="row">
        <div className="col-1">{id}</div>
        <div className="col">
          <s><a href="#" className="todo-task" onClick={change(id)}>{text}</a></s>
        </div>
      </div>
    } else {
		return <div className="row">
      <div className="col-1">{id}</div>
      <div className="col">
        <a href="#" className="todo-task" onClick={change(id)}>{text}</a>
      </div>
    </div>
    }
	}
} 
export default Item; 
