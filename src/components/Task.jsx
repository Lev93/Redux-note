// @ts-check

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { tasksFetchingState, tasks: { byId, allIds } } = state;
  const tasks = allIds.map((id) => byId[id]);
  return { tasks, tasksFetchingState };
};

const actionCreators = {
  removeTask: actions.removeTask,
};

class Tasks extends React.Component {
  handleRemoveTask = (id) => () => {
    const { removeTask } = this.props;
    removeTask({ id });
  };

  render() {
    const { tasks, tasksFetchingState } = this.props;

    if (tasksFetchingState === 'requested') {
      return (
        <div className="spinner-border m-3" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    if (tasksFetchingState === 'failed') {
      return (
        <span>Please, reload page!</span>
      );
    }

    if (tasks.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <ul className="list-group">
          {tasks.map(({ id, text }) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">{text}</span>
              <button type="button" data-test="task-remove" className="close" onClick={this.handleRemoveTask(id)}>
                <span>&times;</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Tasks);
