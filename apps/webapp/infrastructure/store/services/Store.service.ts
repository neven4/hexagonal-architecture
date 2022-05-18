import { StoreRepositoryInterface } from '../respositories/Store.respository.interface';

export const StoreService = <StoreData extends object>(
  repository: StoreRepositoryInterface<StoreData>
): StoreRepositoryInterface<StoreData> => ({
  get: (key) => {
    return repository.get(key);
  },
  set: (key, value) => {
    return repository.set(key, value);
  },
  subscribe: (callback) => {
    repository.subscribe(callback);
  },
});
