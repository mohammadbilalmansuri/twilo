import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, RTE, Upload } from "./index";
import databaseService from "../appwrite/database";
import storageService from "../appwrite/storage";
import { addPost, updatePost, removePost } from "../store/postSlice";
import { useForm } from "react-hook-form";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
      },
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState();

  const onSubmit = async (data) => {
    try {
      const file = data.media[0]
        ? await storageService.uploadFile(data.media[0])
        : null;

      if (post) {
        file && storageService.deleteFile(post.media);
        const postData = {
          ...data,
          media: file ? file.$id : undefined,
        };
        const updatedPost = await databaseService.updatePost(
          post.$id,
          postData
        );
        if (updatedPost) {
          dispatch(removePost(post.$id));
          dispatch(updatePost(updatedPost));
          navigate(`/post/${updatedPost.slug}`);
        }
      } else {
        const postData = {
          ...data,
          userId: userData.$id,
          userName: userData.name,
          media: file ? file.$id : undefined,
        };
        const newPost = await databaseService.createPost(postData);
        if (newPost) {
          dispatch(addPost(newPost));
          navigate(`/post/${newPost.slug}`);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-zA-Z\d+@~]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7 w-3/4"
    >
      <Input
        type="text"
        placeholder="Enter post title"
        onInput={() => setError("")}
        {...register("title", {
          required: true,
        })}
      />

      <Input
        type="text"
        placeholder="Post slug"
        {...register("slug", {
          required: true,
        })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          });
          setError("");
        }}
      />

      <RTE
        name="content"
        placeholder="Enter post content"
        control={control}
        defaultValue={getValues("content")}
      />

      <div className="flex items-center gap-10">
        {post && (
          <div className="flex gap-4 items-center">
            <p className="text-lg cursor-pointer font-semibold">
              Current Media:
            </p>
            <img
              src={storageService.getFilePreview(post.media)}
              alt={post.title}
              className="w-24 object-cover rounded-md"
            />
          </div>
        )}

        <Upload
          label={post ? "Update Media:" : "Upload New Media:"}
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("media", {
            required: !post,
          })}
        />
      </div>

      {error && <p className="text-red-600 font-medium text-center">{error}</p>}

      <Button type="submit">{post ? "Update Post" : "Submit Post"}</Button>
    </form>
  );
}

export default PostForm;
