import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import storageService from "../appwrite/storage";
import formatTime from "../utils/formatTime";

const PostCard = forwardRef(
  ({ $id, title, excerpt, thumbnail, owner, $createdAt, page }, ref) => {
    const navigate = useNavigate();

    return (
      <div
        id={$id}
        {...(ref && { ref })}
        onClick={() => navigate(`/post/${$id}`)}
        className="w-full relative border-1.5 border-black/10 rounded-lg transition-all hover:border-black/60 flex flex-col cursor-pointer lg:p-4 p-3 gap-3 break-words"
      >
        <div className="w-full flex justify-between items-center gap-4">
          <button
            className="group sm:text-lg text-base leading-none text-left text-blue font-medium transition-all flex xs:gap-2 gap-1.5 items-center"
            {...(page === "feed" && {
              onClick: (e) => {
                e.stopPropagation();
                navigate(`/profile/${owner.$id}`);
              },
            })}
          >
            <span className="size-6 flex flex-col items-center justify-center rounded-md xs:text-sm text-xs leading-none bg-blue text-white group-hover:bg-blue/85 font-zen-dots">
              {owner.name[0].toUpperCase()}
            </span>
            <span
              className={`mt-0.5${
                page === "feed" ? " group-hover:underline" : ""
              }`}
            >
              {owner.name}
            </span>
          </button>

          <p className="text text-black/60 leading-none min-w-fit">
            {formatTime($createdAt)}
          </p>
        </div>

        <h3 className="sm:text-xl text-lg font-semibold leading-snug">
          {title}
        </h3>
        <p className="text text-black/60 -mt-2">{excerpt}</p>

        {thumbnail && (
          <img
            src={storageService.getFilePreview(thumbnail)}
            alt={title}
            className="w-full bg-black/5 aspect-video object-cover object-center rounded-lg"
          />
        )}
      </div>
    );
  }
);

export default PostCard;
