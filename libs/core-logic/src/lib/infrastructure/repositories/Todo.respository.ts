import { StoreRepositoryInterface } from '../store/respositories/Store.respository.interface';
import { createStore } from '../store';
import { ApiClientService } from '../apiClient/services/ApiClient.service';
import apiClientRepository from '../apiClient';
import { ApiClientRepositoryInterface } from '../apiClient/repositories/ApiClient.respository.interface';
import { Todo } from '../../domain/models/Todo';
import { TodoRepositoryInterface } from '../../domain/repositories/Todo.repository.interface';

const API_SERVER_URL = 'http://localhost:3333/api';

interface TodoState {
  todo: Todo[];
}

const initialState: TodoState = {
  todo: [],
};

class TodoRepository implements TodoRepositoryInterface {
  constructor(
    private store: StoreRepositoryInterface<TodoState>,
    private apiClient: ApiClientRepositoryInterface
  ) {}

  async getTodos(): Promise<Todo[]> {
    const response = await this.apiClient.get<Todo[]>({
      url: API_SERVER_URL,
    });

    if (response.ok) {
      this.store.set('todo', response.body);

      return response.body;
    }

    return this.store.get('todo');
  }
  async addTodo(text: string) {
    await this.apiClient.post({
      url: `${API_SERVER_URL}/create`,
      body: { text },
    });
  }
  async setDone(id: number, done: boolean) {
    await this.apiClient.post({
      url: `${API_SERVER_URL}/setDone`,
      body: { id, done },
    });
  }
}

const store = createStore(initialState);

const apiClient = ApiClientService(apiClientRepository);

export const todoRepository = new TodoRepository(store, apiClient);
