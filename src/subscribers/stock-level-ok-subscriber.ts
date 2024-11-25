import { StockLevelOkEvent } from "../events";
import { ISubscriber } from "../interfaces";
import { MachineRepository } from "../repositories/machine";

export class StockLevelOkSubscriber implements ISubscriber {
  private _machineRepository: MachineRepository;

  constructor(machineRepository: MachineRepository) {
    this._machineRepository = machineRepository;
  }

  handle(event: StockLevelOkEvent): void {
    const machine = this._machineRepository.findById(event.machineId());
    if (!machine) {
      console.log(
        "[StockLevelOkSubscriber] #handle - Error!: Machine not found!"
      );
      return;
    }

    console.log(
      "[StockLevelOkSubscriber] => ",
      MachineRepository.instance.findById(event.machineId())
    );
  }
}
