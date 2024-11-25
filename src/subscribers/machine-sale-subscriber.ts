import { configs } from "../constants";
import { MachineSaleEvent, LowStockWarningEvent } from "../events";
import { ISubscriber } from "../interfaces";
import { MachineRepository } from "../repositories/machine";
import { PublishSubscribeService } from "../services/pubsub";

export class MachineSaleSubscriber implements ISubscriber {
  private _machineRepository: MachineRepository;

  constructor(machineRepository: MachineRepository) {
    this._machineRepository = machineRepository;
  }

  handle(event: MachineSaleEvent): void {
    const machine = this._machineRepository.findById(event.machineId());

    if (!machine) {
      console.log(
        "[MachineSaleSubscriber] #handle - Error!: Machine not found!"
      );
      return;
    }

    if (machine.stockLevel < event.getSoldQuantity()) {
      console.log(
        "[MachineSaleSubscriber] #handle - Error!: Stock level not sufficient for sale!"
      );
      return;
    }

    machine.previousStockLevel = machine.stockLevel;
    machine.stockLevel -= event.getSoldQuantity();

    if (
      machine.stockLevel < configs.lowStockLevelThreshold &&
      machine.previousStockLevel >= configs.lowStockLevelThreshold
    ) {
      PublishSubscribeService.instance.publish(
        new LowStockWarningEvent(machine.id)
      );
    }

    console.log(
      "[MachineSaleSubscriber] => ",
      this._machineRepository.findAll()
    );
  }
}
