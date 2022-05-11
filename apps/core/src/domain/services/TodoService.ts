import { TodoRepository } from '../repositories/TodoRepository';

export const todoService = (repository: TodoRepository): TodoRepository => ({
  getTodos: () => {
    return repository.getTodos();
  },
  addTodo: (text) => {
    return repository.addTodo(text);
  },
  setDone: (id, done) => {
    return repository.setDone(id, done);
  },
});
