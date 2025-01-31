import React, { useEffect, useMemo, useState } from "react";
import { Container, PostForm } from "../components";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const posts = useSelector((state) => state.post.posts);
  const [post, setPost] = useState(null);

  const currentPost = useMemo(
    () => posts.find((post) => post.$id === id),
    [id, posts]
  );
  const isAuthor = useMemo(
    () =>
      currentPost && userData ? currentPost.owner === userData.$id : false,
    [currentPost, userData]
  );

  useEffect(() => {
    if (currentPost === undefined) {
      navigate("/404");
    } else if (isAuthor) {
      setPost(currentPost);
    }
  }, [isAuthor, currentPost, navigate]);

  if (!post) return null;

  return (
    <>
      <Helmet>
        <title>Edit Post - {post?.title || "Untitled"} - Twilo</title>
      </Helmet>

      <Container className="py-8 min-h flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold leading-tight">Edit post</h2>
        <PostForm post={post} />
      </Container>
    </>
  );
};

export default EditPost;
