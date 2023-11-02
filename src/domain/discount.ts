export class Discount {
  constructor(public readonly percentage: number) {}

  public apply(price: number): number {
    return price - (price * this.percentage) / 100;
  }
}
