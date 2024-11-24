import { configs } from "../constants";
import { MachineRefillEvent } from "../events/refill-event";
import { StockLevelOkEvent } from "../events/stock-level-ok-event";
import { ISubscriber } from "../interfaces/ISubscriber";
import { MachineRepository } from "../repositories/machine";
import { PublishSubscribeService } from "../services/pubsub";

export class MachineRefillSubscriber implements ISubscriber {
  private _machineRepository: MachineRepository;

  constructor(machineRepository: MachineRepository) {
    this._machineRepository = machineRepository;
  }

  handle(event: MachineRefillEvent): void {
    const machine = this._machineRepository.findById(event.machineId());
    if (!machine) {
      console.log(
        "[MachineRefillSubscriber] #handle - Error!: Machine not found!"
      );
      return;
    }
    machine.previousStockLevel = machine.stockLevel;
    machine.stockLevel += event.refillQuantity();

    if (
      machine.stockLevel >= configs.lowStockLevelThreshold &&
      machine.previousStockLevel < configs.lowStockLevelThreshold
    ) {
      PublishSubscribeService.instance.publish(
        new StockLevelOkEvent(machine.id)
      );
    }

    console.log(
      "[MachineRefillSubscriber] => ",
      this._machineRepository.findAll()
    );
  }
}
