import { useNavigate } from "react-router-dom";
import storageService from "../appwrite/storage";
import formatTime from "../utils/formatTime";

const PostCard = ({ $id, title, excerpt, thumbnail, owner, $updatedAt }) => {
  const navigate = useNavigate();

  return (
    <div
      id={$id}
      onClick={() => navigate(`/post/${$id}`)}
      className="w-full relative border-1.5 border-black/10 rounded-lg transition-all hover:border-black/50 flex flex-col cursor-pointer p-4 gap-4 break-inside-avoid overflow-hidden break-words"
    >
      <div className="w-full flex justify-between items-center gap-4">
        <button
          className="leading-none text-blue text-lg pl-2 border-l-2 hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${owner.$id}`);
          }}
        >
          {owner.name}
        </button>

        <p className="leading-tight">{formatTime($updatedAt)}</p>
      </div>

      <h3 className="text-lg font-medium leading-tight">{title}</h3>
      <p className="text-lg text-black/60 -mt-2">{excerpt}</p>

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
