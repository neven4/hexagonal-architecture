import { Todo } from '@hexagonal-architecture/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private todos: Todo[] = [];

  getData(): Todo[] {
    return this.todos;
  }

  addTodo(text: string): void {
    this.todos.push({
      id: this.todos.length + Math.floor(Math.random() * 10000),
      text,
      done: false,
    });
  }

  setDone(id: number, done: boolean): void {
    this.todos = this.todos.map((todo) => ({
      ...todo,
      done: todo.id === id ? done : todo.done,
    }));
  }
}
