import { useNotification } from "../hooks";
import cn from "../utils/cn";

const Notification = () => {
  const { notification, closeNotification } = useNotification();
  if (!notification.isOpen) return null;

  return (
    <div
      className={cn(
        "fixed z-50 sm:top-19 top-18 bg-white rounded-lg border-1.5 border-current px-3 py-2.5 flex gap-4 items-center mx-3",
        notification.type === "success" ? "text-blue" : "text-red"
      )}
    >
      <p className="text font-medium text-current">{notification.message}</p>

      <button
        onClick={closeNotification}
        className="min-w-fit relative flex items-center justify-center"
      >
        <svg viewBox="0 0 384 512" className="size-3 fill-current">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>

        <svg
          viewBox="0 0 512 512"
          className="size-5 absolute z-10 stroke-current"
        >
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
              dur="3s"
              fill="freeze"
            />
          </rect>
        </svg>
      </button>
    </div>
  );
};

export default Notification;
