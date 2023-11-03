import { randomUUID } from "crypto";
import { Event } from "./events/event.interface";

export abstract class Entity {
  protected readonly changes: Event[] = [];

  public constructor(public readonly id: string = randomUUID()) {}

  public stream(): ReadonlyArray<Event> {
    return this.changes;
  }

  public apply(event: Event): void {
    this.when(event);
    this.changes.push(event);
  }

  public assign(props: unknown) {
    Object.assign(this, props);
  }

  public abstract when(event: Event): void;
}
