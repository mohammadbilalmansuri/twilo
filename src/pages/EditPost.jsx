import React, { useEffect, useState } from "react";
import { PostForm, Loader } from "../components";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { databaseService } from "../appwrite";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const posts = useSelector((state) => state.post.posts);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      let currentPost = posts.find((post) => post.$id === id);
      if (!currentPost) {
        try {
          currentPost = await databaseService.getPost(id);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      }

      if (!currentPost) {
        navigate("/posts");
      } else if (currentPost.owner.$id === userData.$id) {
        setPost(currentPost);
      } else {
        navigate("/posts");
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, posts, userData, navigate]);

  if (loading)
    return (
      <div className="max-w min-h relative flex flex-col items-center justify-center">
        <Loader />
      </div>
    );

  if (!post) return null;

  return (
    <>
      <Helmet>
        <title>Edit Post - {post?.title} - Twilo</title>
      </Helmet>

      <div className="max-w relative py-8 flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold leading-tight">Edit post</h2>
        <PostForm post={post} />
      </div>
    </>
  );
};

export default EditPost;
