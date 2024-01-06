import { create } from "zustand";
import { ILaundryItem, LaundryStatus } from "@/interfaces/laundry/laundryItem";

interface LaundryState {
  laundryItems: ILaundryItem[];
  startWashing: (status: LaundryStatus, index: number) => void;
  endWashing: (index: number) => void;
}

export const useLaundryStore = create<LaundryState>((set) => ({
  laundryItems: [
    {
      id: 1,
      status: LaundryStatus.AVAILABLE,
      sizeInKg: 15,
      timer: null,
    },
    {
      id: 2,
      status: LaundryStatus.AVAILABLE,
      sizeInKg: 15,
      timer: null,
    },
    {
      id: 3,
      status: LaundryStatus.AVAILABLE,
      sizeInKg: 15,
      timer: null,
    },
    {
      id: 4,
      status: LaundryStatus.AVAILABLE,
      sizeInKg: 30,
      timer: null,
    },
    {
      id: 5,
      status: LaundryStatus.AVAILABLE,
      sizeInKg: 30,
      timer: null,
    },
    {
      id: 6,
      status: LaundryStatus.AVAILABLE,
      sizeInKg: 60,
      timer: null,
    },
    {
      id: 7,
      status: LaundryStatus.AVAILABLE,
      sizeInKg: 60,
      timer: null,
    },
    {
      id: 8,
      status: LaundryStatus.AVAILABLE,
      sizeInKg: 60,
      timer: null,
    },
  ],
  startWashing: (status: LaundryStatus, id: number) => {
    set((state) => {
      const ONE_AND_A_HALF_MINUTE = 90000;
      const cloneLaundryItems = [...state.laundryItems];
      const findItem = cloneLaundryItems.find(
        (item) => item.id === id
      ) as ILaundryItem;

      findItem.status = status;
      findItem.timer = Date.now() + ONE_AND_A_HALF_MINUTE;

      return {
        ...state,
        laundryItems: cloneLaundryItems,
      };
    });
  },
  endWashing: (index: number) => {
    set((state) => {
      const cloneLaundryItems = [...state.laundryItems];
      cloneLaundryItems[index].status = LaundryStatus.AVAILABLE;
      cloneLaundryItems[index].timer = null;

      return {
        ...state,
        laundryItems: cloneLaundryItems,
      };
    });
  },
}));
