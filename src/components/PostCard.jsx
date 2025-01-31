import { useNavigate } from "react-router-dom";
import storageService from "../appwrite/storage";
import parse from "html-react-parser";
import formatTime from "../utils/formatTime";
import truncateContent from "../utils/truncateContent";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { title, excerpt, thumbnail, $id, owner, $updatedAt } = post;

  return (
    <div
      id={$id}
      onClick={() => {
        navigate(`/post/${$id}`);
      }}
      className="w-full h-40 relative border border-black/20 rounded-lg transition-all hover:border-blue flex items-center cursor-pointer"
    >
      {/* <img
        src={storageService.getFilePreview(thumbnail)}
        alt={title}
        className="w-1/3 h-full object-cover object-center rounded-l-lg"
      /> */}

      <div className="w-2/3 flex flex-col gap-2 p-6">
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        <button
          className="leading-tight flex items-center gap-2 pb-0.5"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${owner.$id}`);
          }}
        >
          by
          <span className="border-b">{owner.$id}</span>
        </button>
        <p>{formatTime($updatedAt)}</p>
      </div>
    </div>
  );
};

export default PostCard;
