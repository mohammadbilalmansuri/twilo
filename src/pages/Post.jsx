import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import storageService from "../appwrite/storage";
import { Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { removePost } from "../store/postSlice";
import { Helmet } from "react-helmet-async";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    const currentPost = posts.find((post) => post.slug === slug);
    if (currentPost) {
      setPost(currentPost);
    } else {
      navigate("/");
    }
  }, [slug, posts, navigate]);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = async () => {
    try {
      const status = await databaseService.deletePost(post.$id);
      if (status) {
        storageService.deleteFile(post.media);
        dispatch(removePost(post.$id));
        navigate("/");
      }
    } catch (error) {
      console.log("Unable to delete post :: ", error);
    }
  };

  //second approach
  /* const deletePost = () => {
    databaseService
      .deletePost(post.$id)
      .then((status) => {
        if (status) {
          storageService.deleteFile(post.media);
          dispatch(removePost(post.$id));
          navigate("/");
        }
      })
      .catch((error) => console.log("Unable to delete post :: ", error));
  }; */

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

  return (
    post && (
      <>
        <Helmet>
          <title>{post.title} - Twilo</title>
        </Helmet>

        <Container className="flex flex-col gap-3">
          <div className="w-full flex justify-between items-center">
            <Link
              to={`/user/${post.userId}`}
              className="flex gap-2 items-center justify-center bg-gray-800 p-2 rounded-md transition-all duration-200 hover:bg-gray-700"
            >
              <img
                src={`https://cloud.appwrite.io/v1/avatars/initials?name=${post?.userName}`}
                alt={post?.userName}
                className="rounded-full w-6 h-6 aspect-square bg-gray-900 object-cover"
              />
              <span className="text-md">{post.userName}</span>
            </Link>
            <div className="flex justify-center items-center gap-4">
              <p className="pt-1">{formatTime(post.$updatedAt)}</p>

              {isAuthor && (
                <div className="flex gap-3 items-center">
                  <Link
                    to={`/edit-post/${post.slug}`}
                    className="p-2 rounded-md bg-accent/75 fill-gray-100 transition-all duration-200 hover:bg-accent/50"
                  >
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                  </Link>
                  <div
                    onClick={deletePost}
                    className="cursor-pointer p-2 rounded-md bg-gray-700 fill-gray-100 transition-all duration-200 hover:bg-gray-600"
                  >
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
          <img
            src={storageService.getFilePreview(post.media)}
            alt={post.title}
            className="rounded-lg aspect-video object-cover"
          />

          <h1 className="pt-4 pl-1 text-2xl font-bold">{post.title}</h1>
          <div className="pl-1 text-lg">{parse(post.content)}</div>
        </Container>
      </>
    )
  );
}
