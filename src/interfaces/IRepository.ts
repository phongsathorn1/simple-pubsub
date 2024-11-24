export interface IRepository<T> {
  bulkAdd(items: T[]): void;
  add(item: T): void;
  findById(id: string): T | null | undefined;
  findAll(): T[];
  update(id: string, item: T): void;
  remove(id: string): void;
}
