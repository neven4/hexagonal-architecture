import { Todo } from '../models/Todo';

export interface TodoRepositoryInterface {
  getTodos: () => Promise<Todo[]>;
  addTodo: (text: string) => void;
  setDone: (id: number, done: boolean) => void;
}
