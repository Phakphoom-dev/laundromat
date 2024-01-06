import { ILaundryItem, LaundryStatus } from "@/interfaces/laundry/laundryItem";
import { ReactSVG } from "react-svg";
import cx from "classnames";
import circle from "@/assets/svg/circle.svg";
import washingMachine from "@/assets/svg/washing-machine.svg";
import CountdownTimer from "@/components/laundryCard/coundownTimer";

interface ILaundryCard extends ILaundryItem {
  index: number;
  handleSelected: () => void;
}

export default function LaundryCard({
  status,
  index,
  sizeInKg,
  timer,
  handleSelected,
}: ILaundryCard) {
  const circleClasses = cx(
    "w-2/5 absolute ",
    status === LaundryStatus.BUSY &&
      "animate-small-shake animate-duration-200 animate-infinite animate-ease-in-out animate-normal"
  );

  const renderStatus = (status: LaundryStatus): JSX.Element => {
    switch (status) {
      case LaundryStatus.AVAILABLE:
        return (
          <div className="badge badge-lg p-4 text-white bg-green-500">
            พร้อมใช้งาน
          </div>
        );
      case LaundryStatus.BUSY:
        return (
          <div className="badge badge-lg p-4 text-white bg-red-500">
            อยู่ระหว่างการทำงาน
          </div>
        );
      default:
        return (
          <div className="badge badge-l text-white bg-green-500">
            พร้อมใช้งาน
          </div>
        );
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl drop-shadow-md">
      <div className="flex justify-end mt-3 mr-3 h-[25px]">
        {timer && <CountdownTimer index={index} timer={timer} />}
      </div>

      <figure className="px-5 relative">
        <ReactSVG className="w-1/2 " src={washingMachine} />
        <ReactSVG className={circleClasses} src={circle} />
      </figure>

      <div className="card-body items-center text-center">
        <div>{renderStatus(status)}</div>
        <p>ขนาดเครื่องซักผ้า: {sizeInKg} กิโลกรัม</p>
        <div className="card-actions w-full">
          <button
            className="btn btn-outline btn-secondary btn-sm w-full"
            disabled={status === LaundryStatus.BUSY}
            onClick={() => {
              handleSelected();
            }}
          >
            ใช้งาน
          </button>
        </div>
      </div>
    </div>
  );
}
