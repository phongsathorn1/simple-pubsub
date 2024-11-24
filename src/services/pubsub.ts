import { EventType } from "../constants";
import { IEvent } from "../interfaces/IEvent";
import { IPublishSubscribeService } from "../interfaces/IPublishSubscribeService";
import { ISubscriber } from "../interfaces/ISubscriber";

export class PublishSubscribeService implements IPublishSubscribeService {
  private static _instance: PublishSubscribeService;
  private _handlers = new Map<string, ISubscriber[]>();

  // Prevent direct calls with the "new"
  private constructor() {}

  public static get instance(): PublishSubscribeService {
    return (
      PublishSubscribeService._instance ||
      (PublishSubscribeService._instance = new this())
    );
  }

  publish(event: IEvent): void {
    console.log(
      `[PublishSubscribeService] #publish - EventType: "${event.type()}"`,
      "- Event:",
      event
    );

    const subscribers = this._handlers.get(event.type());
    if (subscribers) {
      subscribers.forEach((handler) => handler.handle(event));
    }
  }

  subscribe(type: EventType, handler: ISubscriber): void {
    console.log("[PublishSubscribeService] #subscribe - EventType:", type);

    const subscribers = this._handlers.get(type);
    if (subscribers) {
      subscribers.push(handler);
    } else {
      this._handlers.set(type, [handler]);
    }
  }

  unsubscribe(type: EventType, handler: ISubscriber): void {
    console.log("[PublishSubscribeService] #unsubscribe - EventType:", type);

    const subscribers = this._handlers.get(type);
    if (subscribers) {
      this._handlers.set(
        type,
        subscribers.filter((_handler) => _handler != handler)
      );
    }
  }
}
