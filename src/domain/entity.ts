import { Event } from "./event.interface";

export abstract class Entity {
  public readonly id!: string;
  protected readonly events: Event[] = [];

  public stream(): ReadonlyArray<Event> {
    return this.events;
  }

  public apply(event: Event): void {
    this.when(event);
    this.events.push(event);
  }

  public assign(props: unknown) {
    Object.assign(this, props);
  }

  public abstract when(event: Event): void;
}
