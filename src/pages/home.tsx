import LaundryCard from "@/components/laundryCard/laundryCard";
import QrCodeModal from "@/components/modal/qrCodeModal";
import WashingProcessModal from "@/components/modal/washingProcessModal";
import { ILaundryItem, LaundryStatus } from "@/interfaces/laundry/laundryItem";
import { useLaundryStore } from "@/stores/laundryStore";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenQrModal, setIsOpenQrModal] = useState<boolean>(false);
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
      <div className="mb-3">
        สามารถเข้ากลุ่ม Line เพื่อรับการแจ้งเตือนเมื่อเครื่องทำงานใกล้เสร็จสิ้น:{" "}
        <button
          className="btn btn-outline btn-accent"
          onClick={() => {
            setIsOpenQrModal(true);
          }}
        >
          QR Code
        </button>
        <button
          className="btn btn-outline btn-info ml-2"
          onClick={() => {
            window.open("https://line.me/ti/g/HFXGNaLySE", "_blank");
          }}
        >
          Link
        </button>
      </div>
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

      <QrCodeModal
        isOpen={isOpenQrModal}
        handleClose={() => {
          setIsOpenQrModal(false);
        }}
      />
    </>
  );
}
