import React from "react";
import storageService from "../appwrite/storage";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCardUser({
  slug,
  title,
  userName,
  userId,
  content,
  media,
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
    <div className="group bg-gray-800 rounded-xl">
      <Link to={`/post/${slug}`} className="grid grid-cols-5">
        <div className="overflow-hidden rounded-l-xl col-span-2">
          <img
            src={storageService.getFilePreview(media)}
            alt={title}
            className="transition-all duration-300 group-hover:scale-105 aspect-square object-cover rounded-l-xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 p-5 col-span-3">
          <h3 className="font-bold text-lg">{title}</h3>

          <div className="text-sm font-light">
            {parse(truncateContent(content, 25))}
          </div>
          <p className="text-teal-500">{formatTime($updatedAt)}</p>
        </div>
      </Link>
    </div>
  );
}

export default PostCardUser;
