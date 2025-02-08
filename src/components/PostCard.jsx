import { useNavigate, useLocation } from "react-router-dom";
import storageService from "../appwrite/storage";
import formatTime from "../utils/formatTime";

const PostCard = ({ $id, title, excerpt, thumbnail, owner, $createdAt }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      id={$id}
      onClick={() => navigate(`/post/${$id}`)}
      className="w-full relative border-1.5 border-black/10 rounded-lg transition-all hover:border-black/60 flex flex-col cursor-pointer p-4 gap-4 break-inside-avoid overflow-hidden break-words"
    >
      <div className="w-full flex justify-between items-center gap-4">
        {location.pathname !== `/profile/${owner.$id}` && (
          <button
            className="leading-none text-blue md:text-lg text-base font-medium pl-2 border-l-2 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${owner.$id}`);
            }}
          >
            {owner.name}
          </button>
        )}
        <p className="bg-black/5 px-2 py-1 rounded-lg">
          {formatTime($createdAt)}
        </p>
      </div>

      <h3 className="md:text-lg text-base font-semibold leading-snug">
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
};

export default PostCard;
