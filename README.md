В этом упражнении необходимо реализовать записную книжку, которая взаимодействует с бекендом по следующим урлам:

GET /tasks - получить список задач.
Формат ответа - [{"id":1,"text":"asdf","state":"finished"},{"id":2,"text":"asdasd","state":"active"}]
POST /tasks - создать новую задачу.
Формат запроса - {"text": "new task"}
Формат ответа - {"id":4,"text":"new task","state":"active"}
PATCH /tasks/:id/finish - завершить задачу.
Формат ответа - {"id":1,"text":"asdf","state":"finished"}
PATCH /tasks/:id/activate - переоткрыть завершенную задачу - {"id":1,"text":"asdf","state":"active"}
Начальный HTML:

<div>
  <div class="mb-3">
    <form class="todo-form form-inline mx-3">
      <div class="form-group">
        <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
      </div>
      <button type="submit" class="btn btn-primary">add</button>
    </form>
  </div>
</div>
HTML после того как добавлены последовательно три задачи "first task", "second task" и "another task". На последнюю был совершен клик, который перевел задачу в выполненные:

<div>
  <div class="mb-3">
    <form class="todo-form form-inline mx-3">
      <div class="form-group">
        <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
      </div>
      <button type="submit" class="btn btn-primary">add</button>
    </form>
  </div>
  <div class="todo-active-tasks">
    <div class="row">
      <div class="col-1">2</div>
      <div class="col">
        <a href="#" class="todo-task">second task</a>
      </div>
    </div>
    <div class="row">
      <div class="col-1">1</div>
      <div class="col">
        <a href="#" class="todo-task">first task</a>
      </div>
    </div>
  </div>
  <div class="todo-finished-tasks">
    <div class="row">
      <div class="col-1">3</div>
      <div class="col">
        <s><a href="#" class="todo-task">another task</a></s>
      </div>
    </div>
  </div>
</div>