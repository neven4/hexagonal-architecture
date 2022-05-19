import { ApiClientRepositoryInterface } from '../repositories/ApiClient.respository.interface';

export const ApiClientService = (
  repository: ApiClientRepositoryInterface
): ApiClientRepositoryInterface => ({
  get: (params) => {
    return repository.get(params);
  },
  post: (params) => {
    return repository.post(params);
  },
  patch: (params) => {
    return repository.patch(params);
  },
  delete: (params) => {
    return repository.delete(params);
  },
  put: (params) => {
    return repository.put(params);
  },
});
