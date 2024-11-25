import { Machine } from "../entities/machine";
import { IRepository } from "../interfaces";

export class MachineRepository implements IRepository<Machine> {
  private static _instance: MachineRepository;
  private _machines: Machine[] = [];

  private constructor() {}

  public static get instance(): MachineRepository {
    return (
      MachineRepository._instance || (MachineRepository._instance = new this())
    );
  }

  bulkAdd(items: Machine[]) {
    items.forEach((item) => this._machines.push(item));
  }

  add(item: Machine) {
    this._machines.push(item);
  }

  findById(id: string): Machine | null | undefined {
    return this._machines.find((machine) => machine.id === id);
  }

  findAll(): Machine[] {
    return this._machines;
  }

  update(id: string, item: Machine): void {
    const index = this._machines.findIndex((machine) => machine.id == id);
    this._machines[index] = item;
  }

  remove(id: string): void {
    const index = this._machines.findIndex((machine) => machine.id == id);
    this._machines.splice(index, 1);
  }
}
