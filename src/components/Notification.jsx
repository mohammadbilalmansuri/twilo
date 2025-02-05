import { memo } from "react";
import useNotification from "../hooks/useNotification";

const Notification = () => {
  const { notification, close } = useNotification();
  if (!notification.isOpen) return null;

  return (
    <div className="fixed z-50 bottom-8 right-8 rounded-lg bg-black/5 border-1.5 border-black/10 backdrop-blur-lg p-4 flex gap-6 items-center">
      <p className="text-lg font-medium leading-tight -mt-[1px]">
        {notification.content}
      </p>
      <button
        onClick={close}
        className="min-w-fit relative flex items-center justify-center"
      >
        <svg viewBox="0 0 384 512" className="size-4">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>

        <svg viewBox="0 0 512 512" className="size-6 stroke-black absolute">
          <rect
            x="64"
            y="64"
            width="384"
            height="384"
            rx="96"
            ry="96"
            fill="none"
            strokeWidth="32"
            strokeDasharray="1536"
            strokeDashoffset="1536"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="1536"
              to="0"
              dur="5s"
              fill="freeze"
            />
          </rect>
        </svg>
      </button>
    </div>
  );
};

export default memo(Notification);
