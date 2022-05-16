import { TodoRepositoryInterface } from '../repositories/Todo.repository.interface';

export const TodoService = (
  repository: TodoRepositoryInterface
): TodoRepositoryInterface => ({
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
