export default interface IService<T> {
  create(data: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(_id: string): Promise<T | null>;
  update(_id: string, body: T): Promise<T | null>;
}
