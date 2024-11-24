import { LowStockWarningEvent } from "../events/low-stock-warning-event";
import { ISubscriber } from "../interfaces/ISubscriber";
import { MachineRepository } from "../repositories/machine";

export class StockWarningSubscriber implements ISubscriber {
  private _machineRepository: MachineRepository;

  constructor(machineRepository: MachineRepository) {
    this._machineRepository = machineRepository;
  }

  handle(event: LowStockWarningEvent): void {
    const machine = this._machineRepository.findById(event.machineId());
    if (!machine) {
      console.log("[StockWarningSubscriber] #handle - Error!: Machine not found!");
      return;
    }

    console.log(
      "[StockWarningSubscriber] => ",
      MachineRepository.instance.findById(event.machineId())
    );
  }
}
