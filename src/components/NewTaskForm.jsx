// @ts-check

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

// const mapStateToProps = (state) => {
//   const props = {};
//   return props;
// };

const actionCreators = {
  addTask: actions.addTask,
};

class NewTaskForm extends React.Component {
  handleSubmit = async (values) => {
    const { addTask, reset } = this.props;
    try {
      await addTask({ task: values });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }
 

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group mx-3">
          <Field name="text" required disabled={submitting} component="input" type="text" />
        </div>
        <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Add" />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

const ConnectedNewTaskForm = connect(null, actionCreators)(NewTaskForm);
export default reduxForm({
  form: 'newTask',
})(ConnectedNewTaskForm);
