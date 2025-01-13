import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

function Modal({
  isOpen,
  closeModal,
  children,
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <div className='modal'>
      <div className='modal-overlay' onClick={closeModal} />
      <div className='modal-container'>{children}</div>
    </div>,
    document.getElementById("modal-root") as Element
  );
}

export default Modal;
