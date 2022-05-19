import { StoreRepositoryInterface } from './respositories/Store.respository.interface';
import create, { StoreApi } from 'zustand/vanilla';
import { StoreService } from './services/Store.service';
// import { observable, observe } from 'mobx';

// ================== Zustand ==================

class ZustandStore<State extends object>
  implements StoreRepositoryInterface<State>
{
  private readonly store: StoreApi<State>;

  constructor(initialState: State) {
    this.store = create(() => initialState);
  }

  get(key: keyof State) {
    return this.store.getState()[key];
  }

  set(key: keyof State, value: State[keyof State]): void {
    const newValue = {
      [key]: value,
    } as Partial<State>;

    this.store.setState(newValue);
  }

  destroy(): void {
    this.store.destroy();
  }

  subscribe(callback: (newValue: State) => void): void {
    this.store.subscribe(callback);
  }
}

// ================== MOBX ==================

// class MobxStore<State extends object>
//   implements StoreRepositoryInterface<State>
// {
//   private readonly store: State;

//   constructor(initialState: State) {
//     this.store = observable(initialState);
//   }

//   get(key: keyof State) {
//     return this.store[key];
//   }

//   set(key: keyof State, value: State[keyof State]): void {
//     this.store[key] = value;
//   }

//   subscribe(callback: (newValue: State) => void): void {
//     observe(this.store, (change) => {
//       callback(change.object[change.name]);
//     });
//   }
// }

export const createStore = <State extends object>(initalValue: State) => {
  const storeService = StoreService(new ZustandStore(initalValue));

  return storeService;
};
