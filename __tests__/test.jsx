import nock from 'nock';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import timeout from 'timeout-then';
import TodoBox from '../src/TodoBox';

Enzyme.configure({ adapter: new Adapter() });
axios.defaults.adapter = httpAdapter;
nock.disableNetConnect();

const host = 'http://localhost';

test('TodoBox 1', async () => {
  nock(host)
    .get('/tasks')
    .reply(200, []);

  const wrapper = mount(<TodoBox />);
  const input = wrapper.find('input');
  const form = wrapper.find('form');

  await timeout(100);

  expect(wrapper.render()).toMatchSnapshot();
  input.simulate('change', { target: { value: 'new task' } });

  nock(host)
    .post('/tasks', {
      text: 'new task',
    })
    .reply(200, { id: 1, state: 'active', text: 'new task' });
  form.simulate('submit');

  await timeout(100);

  expect(wrapper.render()).toMatchSnapshot();
  input.simulate('change', { target: { value: 'new task 2' } });

  nock(host)
    .post('/tasks', {
      text: 'new task 2',
    })
    .reply(200, { id: 2, state: 'active', text: 'new task 2' });
  form.simulate('submit');

  await timeout(100);

  expect(wrapper.render()).toMatchSnapshot();
});

test('TodoBox 2', async () => {
  const tasks = [
    { id: 2, text: 'task 2', state: 'finished' },
    { id: 1, text: 'task 1', state: 'active' },
  ];
  nock(host)
    .get('/tasks')
    .reply(200, tasks);

  const wrapper = mount(<TodoBox />);

  await timeout(100);

  expect(wrapper.render()).toMatchSnapshot();

  wrapper.update();

  const activeTask = wrapper.find('.todo-active-tasks .todo-task');
  nock(host)
    .patch(`/tasks/${tasks[1].id}/finish`)
    .reply(200, { ...tasks[1], state: 'finished' });
  activeTask.simulate('click');

  await timeout(100);

  wrapper.update();

  expect(wrapper.render()).toMatchSnapshot();

  const finishedTask = wrapper.find('.todo-task').at(0);
  nock(host)
    .patch(`/tasks/${tasks[0].id}/activate`)
    .reply(200, { ...tasks[0], state: 'active' });
  finishedTask.simulate('click');

  await timeout(100);

  wrapper.update();

  expect(wrapper.render()).toMatchSnapshot();
});
