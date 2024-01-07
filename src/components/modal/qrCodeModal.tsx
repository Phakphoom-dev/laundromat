import { useLayoutEffect, useRef } from "react";

interface IQrCodeModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function QrCodeModal({ isOpen, handleClose }: IQrCodeModal) {
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

  return (
    <>
      <dialog
        ref={dialog}
        id="qr_code_modal"
        className="modal"
        onClose={() => {
          handleClose();
        }}
      >
        <div className="modal-box">
          <div className="flex justify-center">
            <div className="avatar">
              <div className="w-96 rounded">
                <img src="/qrCode.jpg" />
              </div>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
