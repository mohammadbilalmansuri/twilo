import React from "react";
import { Container, PostForm } from "../components";
import { Helmet } from "react-helmet-async";

function CreatePost() {
  return (
    <>
      <Helmet>
        <title>Create New Post - Twilo</title>
      </Helmet>

      <Container className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold">Create a new post</h1>
        <PostForm />
      </Container>
    </>
  );
}

export default CreatePost;
