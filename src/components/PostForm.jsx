import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Button, RTE, Loader } from "./index";
import { databaseService, storageService } from "../appwrite";
import { addPost, updatePost, removePost } from "../store/postSlice";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const PostForm = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });

  const handleFileChange = (file) => {
    if (!file) return;
    if (error === "File size exceeds the 10MB limit.") setError("");
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds the 10MB limit.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const removeThumbnail = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    fileInputRef.current.value = "";
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const file = selectedFile
        ? await storageService.uploadFile(selectedFile)
        : null;

      if (post) {
        file && storageService.deleteFile(post.thumbnail);
        const postData = {
          ...data,
          thumbnail: file ? file.$id : undefined,
        };
        const updatedPost = await databaseService.updatePost(
          post.$id,
          postData
        );
        if (updatedPost) {
          dispatch(removePost(post.$id));
          dispatch(updatePost(updatedPost));
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        const postData = {
          title: data.title,
          content: data.content,
          thumbnail: file ? file.$id : "",
          owner: userData.$id,
        };

        const newPost = await databaseService.createPost(postData);
        dispatch(addPost(newPost));
        navigate(`/post/${newPost.$id}`);
      }
    } catch (error) {
      setError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderErrors = () => {
    const errorMessages = [errors?.title?.message, error]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="text-red text-center pt-2">{errorMessages}</p>
    ) : null;
  };

  return (
    <form
      id="postForm"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full relative flex flex-col gap-4"
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
            value: 255,
            message: "Post title must be less than 255 characters",
          },
        })}
      />

      <RTE
        name="content"
        control={control}
        placeholder="Enter post content"
        defaultValue={getValues("content")}
      />

      <div className="w-full relative flex gap-4">
        <div className="w-1/2 h-15 relative">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp, image/svg+xml"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="hidden opacity-0 relative z-0"
          />

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className={`size-full text-lg cursor-pointer border border-black/20 rounded-lg flex items-center justify-center gap-3 ${
              selectedFile || post?.thumbnail
                ? "text-black fill-black"
                : "text-black/50 fill-black/50"
            }`}
          >
            {!selectedFile && !post?.thumbnail ? (
              <svg
                viewBox="0 0 512 512"
                className="size-7 min-w-fit pl-3"
                aria-label="Upload file Icon"
              >
                <path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
              </svg>
            ) : (
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : storageService.getFilePreview(post?.thumbnail)
                }
                alt="Post Thumbnail"
                className="h-full w-auto object-cover rounded-lg"
              />
            )}

            <span className="w-full overflow-hidden text-nowrap text-ellipsis">
              {!selectedFile && !post?.thumbnail
                ? "Select or drop post thumbnail here"
                : selectedFile
                ? selectedFile.name
                : post?.thumbnail}
            </span>

            {(selectedFile || post?.thumbnail) && (
              <button
                id="remove-thumbnail"
                className="min-w-fit p-1 rounded-md z-10 bg-black/5 hover:bg-black/10 active:scale-90 mr-3"
                onClick={removeThumbnail}
              >
                <svg
                  viewBox="0 0 384 512"
                  className="size-4"
                  aria-label="Remove file Icon"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <Button
          type="submit"
          style={1}
          size="lg"
          disabled={loading}
          className="w-1/2 h-15"
        >
          {loading ? (
            <Loader size="sm" color="white" />
          ) : post ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </div>

      {renderErrors()}
    </form>
  );
};

export default PostForm;
