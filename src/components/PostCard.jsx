import React from "react";
import storageService from "../appwrite/storage";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({
  slug,
  title,
  userName,
  userId,
  content,
  thumbnail,
  $updatedAt,
}) {
  function formatTime(time) {
    const now = new Date();
    const postTime = new Date(time);

    const diffMilliseconds = now - postTime;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
      return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
    } else if (diffDays === 0) {
      if (diffHours < 1) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays === 1) {
      return `Yesterday at ${postTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return postTime.toLocaleString([], {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  function truncateContent(content, numWords) {
    const words = content.split(/\s+/);
    if (words.length <= numWords) {
      return content;
    }
    return `${words.slice(0, numWords).join(" ")}...`;
  }

  return (
    <div className="relative group bg-gray-800 rounded-lg">
      <Link to={`/post/${slug}`}>
        <div className="w-full overflow-hidden rounded-t-xl">
          <img
            src={storageService.getFilePreview(thumbnail)}
            alt={title}
            className="transition-all duration-300 group-hover:scale-105 aspect-video object-cover rounded-t-xl"
          />
        </div>
        <div className="flex flex-col gap-3 p-5">
          <h3 className="font-bold text-lg">{title}</h3>

          <div className="text-sm font-light">
            {parse(truncateContent(content, 25))}
          </div>
          <p className="text-teal-500">{formatTime($updatedAt)}</p>
        </div>
      </Link>

      <Link
        to={`/user/${userId}`}
        className="z-10 flex gap-2 items-center justify-between bg-gray-800/95 hover:bg-gray-700/95 p-2 rounded-md absolute top-3 left-3 transition-all duration-200"
      >
        <img
          src={`https://cloud.appwrite.io/v1/avatars/initials?name=${userName}`}
          alt={userName}
          className="rounded-full w-5 h-5 aspect-square bg-gray-900 object-cover"
        />
        <span className="font-semibold text-sm">{userName}</span>
      </Link>
    </div>
  );
}

export default PostCard;
