import { EventType } from "../constants";
import { IEvent } from "./IEvent";
import { ISubscriber } from "./ISubscriber";

export interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: EventType, handler: ISubscriber): void;
  /* Question 2 - build this feature */
  unsubscribe(type: EventType, handler: ISubscriber): void;
}
