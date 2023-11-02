export class Result<T, E extends Error = Error> {
  private constructor(
    private readonly value: T | E,
    private readonly isSuccess: boolean
  ) { }

  public static ok<T, E extends Error = Error>(value: T): Result<T, E> {
    return new Result<T, E>(value, true);
  }

  public static fail<T, E extends Error>(value: E): Result<T, E> {
    return new Result<T, E>(value, false);
  }

  public getValue<V extends T | E = T | E>(): V {
    return this.value as V;
  }

  public isOk(): this is Result<T, never> {
    return this.isSuccess;
  }

  public isFail(): this is Result<never, E> {
    return !this.isSuccess;
  }
}