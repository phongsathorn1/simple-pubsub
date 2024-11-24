export enum EventType {
  SaleEvent = "sale",
  RefillEvent = "refill",
  LowStockWarningEvent = "low_stock_warning",
  StockLevelOkEvent = "stock_level_ok",
}

export const configs = {
  lowStockLevelThreshold: 3,
};
