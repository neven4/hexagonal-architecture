import { Todo } from '../models/Todo';

export interface TodoRepository {
  getTodos: () => Promise<Todo[]>;
  addTodo: (text: string) => void;
  setDone: (id: number, done: boolean) => void;
}
