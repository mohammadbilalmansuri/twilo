import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const currentPost = posts.find((post) => post.slug === slug);
    const isAuthor =
      currentPost && userData ? currentPost.userId === userData.$id : false;

    if (isAuthor) {
      setPost(currentPost);
    } else {
      navigate("/");
    }
  }, [slug, posts, userData, navigate]);

  return post ? (
    <>
      <Helmet>
        <title>Edit Post - {post.title} | Twilo</title>
      </Helmet>

      <Container className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold">Edit Post</h1>
        <PostForm post={post} />
      </Container>
    </>
  ) : null;
}

export default EditPost;
