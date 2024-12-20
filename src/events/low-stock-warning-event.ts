import { EventType } from "../constants";
import { IEvent } from "../interfaces";

export class LowStockWarningEvent implements IEvent {
  constructor(private readonly _machineId: string) {}

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return EventType.LowStockWarningEvent;
  }
}
