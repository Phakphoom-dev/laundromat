export enum LaundryStatus {
  AVAILABLE = "available",
  BUSY = "busy",
}

export interface ILaundryItem {
  id: number;
  status: LaundryStatus;
  sizeInKg: 15 | 30 | 60;
  timer: null | number;
}
