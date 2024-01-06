import { ILaundryItem } from "@/interfaces/laundry/laundryItem";

export enum WaterTemp {
  HOT = "hot",
  COLD = "cold",
}

export enum PaymentMethod {
  CASH = "cash",
  COIN = "coin",
}

export interface IPaymentCard {
  onSelected: (temp: PaymentMethod) => void;
  paymentMethod: PaymentMethod;
  selectedMethod: PaymentMethod;
}

export interface IWashingProcessForm {
  temp: WaterTemp;
  paymentMethod: PaymentMethod;
}

export interface IWaterCard {
  onSelected: (temp: WaterTemp) => void;
  temp: WaterTemp;
  selectedTemp: WaterTemp;
}

export interface IWashingProcessModal {
  isOpen: boolean;
  laundryItem: ILaundryItem;
  handleClose: () => void;
}
