import LaundryCard from "@/components/laundryCard/laundryCard";
import WashingProcessModal from "@/components/modal/washingProcessModal";
import { ILaundryItem, LaundryStatus } from "@/interfaces/laundry/laundryItem";
import { useLaundryStore } from "@/stores/laundryStore";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ILaundryItem>(
    {} as ILaundryItem
  );
  const { laundryItems } = useLaundryStore();

  const handleSelected = (laundryItem: ILaundryItem) => {
    setSelectedItem(laundryItem);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {laundryItems.map((laundryItem: ILaundryItem, index: number) => {
          return (
            <LaundryCard
              handleSelected={() => handleSelected(laundryItem)}
              {...laundryItem}
              key={laundryItem.id}
              index={index}
            />
          );
        })}
      </div>

      <WashingProcessModal
        laundryItem={selectedItem}
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
