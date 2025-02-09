import React, { forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import storageService from "../appwrite/storage";
import formatTime from "../utils/formatTime";
import cn from "../utils/cn";

const PostCard = forwardRef(
  ({ $id, title, excerpt, thumbnail, owner, $createdAt }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <div
        id={$id}
        ref={ref}
        onClick={() => navigate(`/post/${$id}`)}
        className="w-full relative border-1.5 border-black/10 rounded-lg transition-all hover:border-black/60 flex flex-col cursor-pointer p-4 gap-4 break-inside-avoid overflow-hidden break-words"
      >
        <div className="w-full flex justify-between items-center gap-4">
          <button
            className={cn(
              "text-lg leading-none pl-2 border-l-2 border-blue text-blue font-medium",
              !location.pathname.includes("/profile") && "hover:underline"
            )}
            {...(!location.pathname.includes("/profile") && {
              onClick: (e) => {
                e.stopPropagation();
                navigate(`/profile/${owner.$id}`);
              },
            })}
          >
            {owner.name}
          </button>

          <p className="bg-black/5 px-2 py-1 rounded-lg">
            {formatTime($createdAt)}
          </p>
        </div>

        <h3 className="sm:text-lg text-base font-semibold leading-snug">
          {title}
        </h3>
        <p className="text -mt-2">{excerpt}</p>

        {thumbnail && (
          <img
            src={storageService.getFilePreview(thumbnail)}
            alt={title}
            className="w-full object-cover object-center rounded-lg"
          />
        )}
      </div>
    );
  }
);

export default PostCard;
