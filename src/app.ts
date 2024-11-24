import { EventType } from "./constants";
import { Machine } from "./entities/machine";
import { MachineRefillEvent } from "./events/refill-event";
import { MachineSaleEvent } from "./events/sale-event";
import { IEvent } from "./interfaces/IEvent";
import { IPublishSubscribeService } from "./interfaces/IPublishSubscribeService";
import { MachineRepository } from "./repositories/machine";
import { PublishSubscribeService } from "./services/pubsub";
import { StockWarningSubscriber } from "./subscribers/machine-low-level-warning-subscriber";
import { MachineRefillSubscriber } from "./subscribers/machine-refill-subscriber";
import { MachineSaleSubscriber } from "./subscribers/machine-sale-subscriber";
import { StockLevelOkSubscriber } from "./subscribers/stock-level-ok-subscriber";

// helpers
const randomMachine = (): string => {
  const random = Math.random() * 3;
  if (random < 1) {
    return "001";
  } else if (random < 2) {
    return "002";
  }
  return "003";
};

const eventGenerator = (): IEvent => {
  const random = Math.random();
  if (random < 0.5) {
    const saleQty = Math.random() < 0.5 ? 1 : 2; // 1 or 2
    return new MachineSaleEvent(saleQty, randomMachine());
  }
  const refillQty = Math.random() < 0.5 ? 3 : 5; // 3 or 5
  return new MachineRefillEvent(refillQty, randomMachine());
};

// program
(async () => {
  console.log("[Main] - Start");

  // create 3 machines with a quantity of 10 stock
  const machines: Machine[] = [
    new Machine("001"),
    new Machine("002"),
    new Machine("003"),
  ];

  const machineRepository = MachineRepository.instance;
  machineRepository.bulkAdd(machines);

  console.log("[Init Machines] -", machineRepository.findAll());

  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const saleSubscriber = new MachineSaleSubscriber(machineRepository);
  const refillSubscriber = new MachineRefillSubscriber(machineRepository);
  const stockWarningSubscriber = new StockWarningSubscriber(machineRepository);
  const stockLevelOkSubscriber = new StockLevelOkSubscriber(machineRepository);

  const pubSubService: IPublishSubscribeService =
    PublishSubscribeService.instance;

  // Subscribe
  pubSubService.subscribe(EventType.SaleEvent, saleSubscriber);
  pubSubService.subscribe(EventType.RefillEvent, refillSubscriber);
  pubSubService.subscribe(
    EventType.LowStockWarningEvent,
    stockWarningSubscriber
  );
  pubSubService.subscribe(EventType.StockLevelOkEvent, stockLevelOkSubscriber);

  // Generate events
  // create 5 random events
  const events = [1, 2, 3, 4, 5].map((i) => eventGenerator());
  // publish the events
  events.map((event) => pubSubService.publish(event));

  // Test add machine 004
  machineRepository.add(new Machine("004"));

  // const events2 = [
  //   new MachineSaleEvent(3, "001"),
  //   new MachineSaleEvent(2, "002"),
  //   new MachineSaleEvent(9, "003"),
  //   new MachineSaleEvent(9, "004"),
  //   new MachineSaleEvent(1000, "004"),

  //   new MachineRefillEvent(1, "001"),
  //   new MachineRefillEvent(1, "001"),
  // ];

  // events2.map((event) => pubSubService.publish(event));
  // pubSubService.unsubscribe(EventType.SaleEvent, saleSubscriber);

  console.log("[Main] - Done!");
})();
