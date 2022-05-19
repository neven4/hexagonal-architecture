import { requestServer } from '../../utils';
import {
  ApiClientParams,
  ApiClientRepositoryInterface,
} from './repositories/ApiClient.respository.interface';

class FetchApiClientRepository implements ApiClientRepositoryInterface {
  get<T>(params: ApiClientParams) {
    return requestServer<T>({ ...params, method: 'GET' });
  }
  post<T>(params: ApiClientParams) {
    return requestServer<T>({ ...params, method: 'POST' });
  }
  patch<T>(params: ApiClientParams) {
    return requestServer<T>({ ...params, method: 'PATCH' });
  }
  delete<T>(params: ApiClientParams) {
    return requestServer<T>({ ...params, method: 'DELETE' });
  }
  put<T>(params: ApiClientParams) {
    return requestServer<T>({ ...params, method: 'PUT' });
  }
}

const apiClientRepository = new FetchApiClientRepository();

export default apiClientRepository;
