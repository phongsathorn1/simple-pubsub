export class Machine {
  public stockLevel = 10;
  public previousStockLevel = 10;
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
