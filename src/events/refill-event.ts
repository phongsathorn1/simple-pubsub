import { EventType } from "../constants";
import { IEvent } from "../interfaces/IEvent";

export class MachineRefillEvent implements IEvent {
  constructor(
    private readonly _refill: number,
    private readonly _machineId: string
  ) {}

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return EventType.RefillEvent;
  }

  refillQuantity(): number {
    return this._refill;
  }
}
