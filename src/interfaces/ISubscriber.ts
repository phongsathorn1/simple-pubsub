import { IEvent } from ".";

export interface ISubscriber {
  handle(event: IEvent): void;
}
