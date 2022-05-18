import { TodoService } from '@hexagonal-architecture/core-logic';
import { Todo } from '@hexagonal-architecture/shared-types';
import { createResource } from 'solid-js';
import todoRepository from '../repositories/Todo.respository';

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
