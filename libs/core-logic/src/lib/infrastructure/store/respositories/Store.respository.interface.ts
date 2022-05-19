export interface StoreRepositoryInterface<StoreData extends object> {
  set: (key: keyof StoreData, value: StoreData[keyof StoreData]) => void;
  get: (key: keyof StoreData) => StoreData[keyof StoreData];
  subscribe: (callback: (newValue: StoreData) => void) => void;
}
