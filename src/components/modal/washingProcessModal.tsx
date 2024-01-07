import { LaundryStatus } from "@/interfaces/laundry/laundryItem";
import { useLayoutEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import cx from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLaundryStore } from "@/stores/laundryStore";
import {
  IPaymentCard,
  IWashingProcessForm,
  IWashingProcessModal,
  IWaterCard,
  PaymentMethod,
  WaterTemp,
} from "@/interfaces/laundry/washingProcessModal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import hotWaterIcon from "@/assets/svg/hot-water.svg";
import coldWaterIcon from "@/assets/svg/cold-water.svg";
import coinIcon from "@/assets/svg/coin.svg";
import promtPayIcon from "@/assets/svg/promtpay.svg";

const schema = yup.object().shape({
  temp: yup.mixed<WaterTemp>().oneOf(Object.values(WaterTemp)).required(),
  paymentMethod: yup
    .mixed<PaymentMethod>()
    .oneOf(Object.values(PaymentMethod))
    .required(),
});

export default function WashingProcessModal({
  isOpen,
  laundryItem,
  handleClose,
}: IWashingProcessModal) {
  const { startWashing } = useLaundryStore();
  const dialog = useRef<HTMLDialogElement | null>(null);

  useLayoutEffect(() => {
    if (dialog && dialog.current) {
      if (isOpen) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }
  }, [isOpen]);

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, errors },
    watch,
  } = useForm<IWashingProcessForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IWashingProcessForm> = (
    data: IWashingProcessForm
  ) => {
    startWashing(LaundryStatus.BUSY, laundryItem.id);
    handleClose();
  };

  return (
    <dialog
      ref={dialog}
      id="washing_process_modal"
      className="modal"
      onClose={() => {
        reset();
        handleClose();
      }}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg my-2">อุณหภูมิของน้ำ</h3>

        <div className="flex gap-3">
          {Object.keys(WaterTemp).map((key) => {
            const temp = WaterTemp[key as keyof typeof WaterTemp];

            return (
              <WaterCard
                key={temp}
                temp={temp}
                onSelected={(selectedTemp: WaterTemp) => {
                  setValue("temp", selectedTemp, { shouldValidate: true });
                }}
                selectedTemp={watch("temp") as WaterTemp}
              />
            );
          })}
        </div>

        <h3 className="font-bold text-lg my-2">ช่องทางการชำระเงิน</h3>

        <div className="flex gap-3">
          {Object.keys(PaymentMethod).map((key) => {
            const method = PaymentMethod[key as keyof typeof PaymentMethod];

            return (
              <PaymentCard
                key={method}
                paymentMethod={method}
                onSelected={(selectedMethod: PaymentMethod) => {
                  setValue("paymentMethod", selectedMethod, {
                    shouldValidate: true,
                  });
                }}
                selectedMethod={watch("paymentMethod") as PaymentMethod}
              />
            );
          })}
        </div>

        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={() => {
              handleClose();
            }}
          >
            ยกเลิก
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!isValid}
            >
              ยืนยัน
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export function WaterCard({ temp, onSelected, selectedTemp }: IWaterCard) {
  const cardClasses = cx(
    "card w-1/2 bg-base-100 shadow-xl hover:cursor-pointer border-2",
    temp === selectedTemp ? "border-primary" : "border-transparent"
  );

  return (
    <div
      className={cardClasses}
      onClick={() => {
        onSelected(temp);
      }}
    >
      <div className="card-body">
        <h2 className="card-title">{temp.toLocaleUpperCase()}</h2>

        <div className="flex justify-center">
          <ReactSVG
            className="w-3/4"
            src={temp === WaterTemp.HOT ? hotWaterIcon : coldWaterIcon}
          />
        </div>
      </div>
    </div>
  );
}

export function PaymentCard({
  paymentMethod,
  onSelected,
  selectedMethod,
}: IPaymentCard) {
  const cardClasses = cx(
    "card w-1/2 bg-base-100 shadow-xl hover:cursor-pointer border-2",
    paymentMethod === selectedMethod ? "border-primary" : "border-transparent"
  );

  return (
    <div
      className={cardClasses}
      onClick={() => {
        onSelected(paymentMethod);
      }}
    >
      <div className="card-body">
        <h2 className="card-title">{paymentMethod.toLocaleUpperCase()}</h2>

        <div className="flex justify-center">
          <ReactSVG
            className="w-3/4"
            src={paymentMethod === PaymentMethod.CASH ? coinIcon : promtPayIcon}
          />
        </div>
      </div>
    </div>
  );
}
