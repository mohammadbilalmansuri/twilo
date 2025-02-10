import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFilePreview } from "../appwrite/storage";
import formatTime from "../utils/formatTime";
import cn from "../utils/cn";

const PostCard = forwardRef(
  ({ $id, summary, thumbnail, owner, $createdAt, page }, ref) => {
    const navigate = useNavigate();
    const [isShowingMore, setIsShowingMore] = useState(false);

    return (
      <div
        id={$id}
        ref={ref}
        onClick={() => navigate(`/post/${$id}`)}
        className="w-full relative border-1.5 border-black/10 rounded-lg transition-all hover:border-black/40 flex flex-col cursor-pointer lg:p-4 p-3 sm:gap-4 gap-3 break-words"
      >
        <div className="w-full flex justify-between items-center gap-4">
          <button
            className="group sm:text-lg text-base leading-none text-left text-blue font-medium transition-all flex xs:gap-2 gap-1.5 items-center relative z-50"
            {...(page === "feed" && {
              onClick: (e) => {
                e.stopPropagation();
                navigate(`/profile/${owner.$id}`);
              },
            })}
          >
            <span
              className={cn(
                "size-6 flex flex-col items-center justify-center rounded-md xs:text-sm text-xs leading-[0.8] bg-blue text-white font-zen-dots",
                page === "feed" && "group-hover:bg-blue/85"
              )}
            >
              {owner.name[0].toUpperCase()}
            </span>
            <span
              className={cn(
                "mt-0.5",
                page === "feed" && "group-hover:underline"
              )}
            >
              {owner.name}
            </span>
          </button>

          <p className="text text-black/60 leading-none min-w-fit">
            {formatTime($createdAt)}
          </p>
        </div>

        <p className="text text-black/60">
          {isShowingMore ? (
            <>
              {summary}{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowingMore(false);
                }}
                className="text-blue hover:underline"
              >
                see less
              </span>
            </>
          ) : (
            <>
              {summary.slice(0, 150) + "..."}{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowingMore(true);
                }}
                className="text-blue hover:underline"
              >
                see more
              </span>
            </>
          )}
        </p>

        {thumbnail && (
          <img
            src={getFilePreview(thumbnail)}
            alt="Post thumbnail"
            className="w-full bg-black/5 object-cover object-center rounded-lg sm:min-h-72 min-h-60"
          />
        )}
      </div>
    );
  }
);

export default PostCard;
