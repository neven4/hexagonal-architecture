import {
  Todo,
  todoRepository,
  TodoService,
} from '@hexagonal-architecture/core-logic';
import { createResource } from 'solid-js';

const todoService = TodoService(todoRepository);

const [todos, { refetch }] = createResource<Todo[]>(
  () => todoService.getTodos(),
  {
    initialValue: [],
  }
);

const toggleTodo = async (id: number) => {
  const currentTodo = todos().find((todo) => todo.id === id);

  await todoService.setDone(id, !currentTodo?.done);

  refetch();
};

const addTodo = async (text: string) => {
  await todoService.addTodo(text);

  refetch();
};

export { todos, toggleTodo, addTodo };
