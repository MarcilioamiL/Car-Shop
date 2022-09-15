export default interface IService<T> {
  create(data: T): Promise<T>;
}