import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, RTE, Textarea, Loader } from "./index";
import { databaseService, storageService } from "../appwrite";
import { addPost, updatePost, removePost } from "../store/postSlice";
import { useForm } from "react-hook-form";

const PostForm = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [value, setValue] = React.useState("**Hello world!!!**");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "Enter post content",
    },
  });

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

  const renderErrors = () => {
    const errorMessages = [
      errors?.name?.message,
      errors?.userId?.message,
      errors?.email?.message,
      errors?.password?.message,
      serverError,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const [fileName, setFileName] = useState("No File Chosen");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <form
      id="signupForm"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full relative flex flex-col gap-4 pt-2"
    >
      <Input
        type="text"
        id="title"
        placeholder="Enter post title"
        {...register("title", {
          required: true,
          minLength: {
            value: 16,
            message: "Post title must be at least 16 characters",
          },
          maxLength: {
            value: 128,
            message: "Post title must be less than 128 characters",
          },
        })}
      />

      <RTE
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />

      <div className="w-full grid grid-cols-2 gap-4 items-center">
        <div className="w-full size-14 border border-dashed border-secondary/25 flex flex-col items-center justify-center relative rounded-lg overflow-hidden">
          <input
            type="file"
            id="media"
            className="size-full absolute z-10 left-0 flex items-center justify-center opacity-0 cursor-pointer"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
            {...register("media", {
              required: !post,
            })}
            onChange={handleFileChange}
          />

          <div className="size-full flex gap-3 items-center justify-between p-4 cursor-pointer">
            <svg
              viewBox="0 0 512 512"
              className="size-6 min-w-fit fill-secondary/50 cursor-pointer"
            >
              <path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
            <p className="text-secondary/50 w-full overflow-hidden text-nowrap text-ellipsis">
              {fileName}
            </p>

            <button
              type="button"
              className="min-w-fit relative z-20 bg-neutral p-1.5 rounded-md"
            >
              <svg viewBox="0 0 384 512" className="size-4 fill-accent">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        </div>

        {post && (
          <div className="flex gap-4 items-center">
            <p className="text-lg cursor-pointer font-semibold">
              Current Media:
            </p>
            <img
              // src={storageService.getFilePreview(post?.media)}
              alt={post?.title}
              className="w-24 object-cover rounded-md"
            />
          </div>
        )}

        <Button type="submit" style={1} size="lg" disabled={loading}>
          {loading ? <Loader size="sm" color="primary" /> : "Create"}
        </Button>
      </div>

      {renderErrors()}
    </form>
  );
};

export default PostForm;
