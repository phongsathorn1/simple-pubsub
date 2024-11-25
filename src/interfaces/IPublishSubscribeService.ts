import { IEvent, ISubscriber } from ".";
import { EventType } from "../constants";

export interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: EventType, handler: ISubscriber): void;
  /* Question 2 - build this feature */
  unsubscribe(type: EventType, handler: ISubscriber): void;
}
