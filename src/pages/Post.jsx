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

      <div className="wrapper-left gap-6 py-8">
        <div className="w-full flex justify-between items-center">
          <Link
            to={`/profile/${post.owner.$id}`}
            className="flex gap-2 items-center group"
          >
            <span className="icon bg-blue hover:bg-blue/85 fill-white">
              <svg
                viewBox="0 0 448 512"
                className="size-4"
                aria-label="User Icon"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
            </span>
            <span className="sm:text-lg text-base font-medium group-hover:text-blue group-hover:underline">
              {post.owner.name}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <p className="sm:text-lg text-base">
              {formatTime(post.$createdAt)}
            </p>

            {post.isOwner && (
              <>
                <Link
                  to={`/edit-post/${post.$id}`}
                  className="icon bg-black/5 fill-black hover:bg-black/10"
                >
                  <svg
                    viewBox="0 0 512 512"
                    aria-label="Edit Icon"
                    className="size-4"
                  >
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </Link>
                <button
                  className="icon bg-black/5 fill-black hover:fill-red"
                  onClick={() => deletePost(post)}
                  disabled={deleting}
                >
                  {deleting ? (
                    <Loader size="xs" color="red" />
                  ) : (
                    <svg
                      viewBox="0 0 448 512"
                      className="size-4"
                      aria-label="Delete Icon"
                    >
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
            className="w-full aspect-video object-cover object-center rounded-lg bg-black/5"
          />
        )}

        <h1 className="text-3xl font-bold leading-snug">{post.title}</h1>
        <p className="sm:text-lg text-base leading-snug text-black/60 pl-4 border-l-3 border-black/10">
          {post.excerpt}
        </p>
        <div className="sm:text-lg text-base leading-snug text-black/60 pt-2">
          {parse(post.content)}
        </div>
      </div>
    </>
  ) : null;
};

export default Post;
