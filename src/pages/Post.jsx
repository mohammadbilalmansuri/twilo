import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import storageService from "../appwrite/storage";
import parse from "html-react-parser";
import { Helmet } from "react-helmet-async";
import formatTime from "../utils/formatTime";
import { Loader, Loading } from "../components";
import { usePost, usePostActions } from "../hooks";

const Post = () => {
  const { id } = useParams();
  const { fetchPost, loading, post } = usePost();
  const { deletePost, loading: deleting } = usePostActions();

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  return loading ? (
    <Loading />
  ) : post ? (
    <>
      <Helmet>
        <title>{post.title} - Twilo</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="max-w min-h-inherit relative flex flex-col gap-4 lg:py-4 py-3">
        <div className="w-full flex justify-between items-center border-1.5 border-black/10 rounded-lg lg:p-4 p-3">
          <Link
            to={`/profile/${post.owner.$id}`}
            className="group text-lg leading-none text-blue font-medium transition-all flex gap-2 items-center"
          >
            <span className="sm:size-8 size-7 flex flex-col items-center justify-center sm:rounded-lg rounded-md sm:text-base text-sm leading-none bg-blue text-white group-hover:bg-blue/85 font-zen-dots">
              {post.owner.name[0].toUpperCase()}
            </span>
            <span className="group-hover:underline mt-0.5">
              {post.owner.name}
            </span>
          </Link>

          <div className="flex items-center sm:gap-4 gap-3">
            <p className="text">{formatTime(post.$createdAt)}</p>

            {post.isOwner && (
              <>
                <Link
                  to={`/edit/${post.$id}`}
                  className="icon bg-black/5 fill-black hover:bg-black/10"
                >
                  <svg viewBox="0 0 512 512" className="sm:size-4 size-3.5">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </Link>

                <button
                  className="icon bg-black/5 fill-black hover:bg-black/10"
                  onClick={() => deletePost(post)}
                  disabled={deleting}
                >
                  {deleting ? (
                    <Loader size="xs" color="blue" />
                  ) : (
                    <svg viewBox="0 0 448 512" className="sm:size-4 size-3.5">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {post.thumbnail && (
          <img
            src={storageService.getFilePreview(post.thumbnail)}
            alt={post.title}
            className="w-full aspect-video object-cover object-center rounded-lg bg-black/5 lg:mt-0 -mt-1"
          />
        )}

        <h1 className="md:text-3xl xs:text-2xl text-xl font-semibold leading-tight">
          {post.title}
        </h1>
        <p className="text text-black pl-3 border-l-3 border-blue">
          {post.excerpt}
        </p>
        <div className="text text-black/60">{parse(post.content)}</div>
      </div>
    </>
  ) : null;
};

export default Post;
