import React, { ReactNode, useRef, useState } from "react";
import { ArrowRightIcon, CrossIcon } from "../../assets/icons";
import useKeyPress from "../../hooks/useKeyPress";
import { cn } from "../../utils";
type AppModalProps = {
  show: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeButton?: React.ReactNode;
  isWindow?: boolean;
  modalClass?: string;
  title?: string;
  customTitle?: ReactNode;
};

const AppModal = ({
  show,
  onClose,
  children,
  closeButton,
  isWindow,
  modalClass,
  title,
  customTitle,
}: AppModalProps) => {
  const [isMaximize, setMaximize] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const handleWindowStage = () => {
    setMaximize((b) => !b);
  };
  useKeyPress("Escape", () => {
    onClose?.();
  });

  if (!show) {
    return null;
  }
  return (
    <div
      ref={dialogRef}
      className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-end bg-black/20 "
    >
      <div
        className={cn(
          `scrollbar-track-blue-lightest scrollbar-thumb-blue-dark  relative    m-auto flex w-full flex-col  overflow-auto rounded bg-white p-4 shadow-2xl transition-transform    scrollbar-thin md:w-[400px]  ${
            isMaximize ? "!h-full !w-full" : "max-h-[calc(100vh-150px)]"
          } `,
          modalClass
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <header className="mb-2   flex   items-center justify-between">
            {customTitle ? (
              customTitle
            ) : (
              <div className="font-poppins_w text-xl font-medium  tracking-wide text-theme-black ">
                {title}
              </div>
            )}

            <button
              onClick={() => {
                onClose();
              }}
              className="rounded-full"
              title="Close"
            >
              <CrossIcon className="text-blue-dark  h-7 cursor-pointer hover:text-coral" />
            </button>
          </header>
        )}
        <div className="absolute right-0 top-2">
          {isWindow && (
            <button
              data-testid="window-btn"
              title={isMaximize ? "Minimize" : "Maximize"}
              onClick={handleWindowStage}
              className={` p-3 transition-all ${
                isMaximize
                  ? "rotate-180 text-yellow-900 hover:bg-yellow-100"
                  : "text-green-900 hover:bg-green-100"
              }`}
            >
              <ArrowRightIcon />
            </button>
          )}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default AppModal;
