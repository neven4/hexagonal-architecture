import {
  Todo,
  todoRepository,
  TodoService,
} from '@hexagonal-architecture/core-logic';
import { useCallback, useEffect, useState } from 'react';

const todoService = TodoService(todoRepository);

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const requestTodos = useCallback(async () => {
    const todos = await todoService.getTodos();

    setTodos(todos);
  }, []);

  useEffect(() => {
    requestTodos();
  }, [requestTodos]);

  const toggleTodo = useCallback(
    async (id: number) => {
      const currentTodo = todos.find((todo) => todo.id === id);

      await todoService.setDone(id, !currentTodo?.done);

      requestTodos();
    },
    [requestTodos, todos]
  );

  const addTodo = useCallback(
    async (text: string) => {
      await todoService.addTodo(text);

      requestTodos();
    },
    [requestTodos]
  );

  return { todos, addTodo, toggleTodo };
};
