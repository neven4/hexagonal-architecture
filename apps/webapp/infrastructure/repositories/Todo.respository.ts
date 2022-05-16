import {
  TodoRepositoryInterface,
  Todo,
} from '@hexagonal-architecture/core-logic';
import { requestServer } from '../../utils';
import { API_SERVER_URL } from '../../constants';

class TodoRepository implements TodoRepositoryInterface {
  async getTodos() {
    const response = await requestServer<Todo[]>({
      url: API_SERVER_URL,
      method: 'GET',
    });

    return response.body;
  }
  async addTodo(text: string) {
    await requestServer({
      url: `${API_SERVER_URL}/create`,
      method: 'POST',
      body: { text },
    });
  }
  async setDone(id: number, done: boolean) {
    await requestServer({
      url: `${API_SERVER_URL}/setDone`,
      method: 'POST',
      body: { id, done },
    });
  }
}

const todoRepository = new TodoRepository();

export default todoRepository;
