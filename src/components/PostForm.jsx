import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Textarea, Button, RTE, Loader } from "./index";
import { databaseService, storageService } from "../appwrite";
import { addPost, updatePost } from "../store/postsSlice";
import { useForm } from "react-hook-form";
import { useAuth, usePostServices } from "../hooks";

const PostForm = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [thumbnail, setThumbnail] = useState({
    old: post?.thumbnail || null,
    new: null,
    previewUrl: null,
  });
  const { isPostsFetched } = usePostServices();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
    },
  });

  const handleFileChange = useCallback(
    (file) => {
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds the 10MB limit.");
        return;
      }
      if (error === "File size exceeds the 10MB limit.") setError("");
      if (thumbnail.previewUrl) URL.revokeObjectURL(thumbnail.previewUrl);
      setThumbnail((prev) => ({
        ...prev,
        new: file,
        previewUrl: URL.createObjectURL(file),
      }));
    },
    [thumbnail.new, error]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const removeThumbnail = (e) => {
    e.stopPropagation();
    if (thumbnail.previewUrl) URL.revokeObjectURL(thumbnail.previewUrl);
    setThumbnail({ old: null, new: null });
    fileInputRef.current.value = "";
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const file = thumbnail.new
        ? await storageService.uploadFile(thumbnail.new)
        : null;

      if (post) {
        const postData = {};
        if (data.title !== post.title) postData.title = data.title;
        if (data.excerpt !== post.excerpt) postData.excerpt = data.excerpt;
        if (data.content !== post.content) postData.content = data.content;

        if (thumbnail.old === null && post.thumbnail) {
          await storageService.deleteFile(post.thumbnail);
          postData.thumbnail = "";
        }

        if (file) postData.thumbnail = file.$id;

        const updatedPost = await databaseService.updatePost(
          post.$id,
          postData
        );

        if (isPostsFetched) dispatch(updatePost(updatedPost));
        navigate(`/post/${updatedPost.$id}`);
      } else {
        const postData = {
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          thumbnail: file ? file.$id : "",
          owner: userData.$id,
        };

        const newPost = await databaseService.createPost(postData);
        if (isPostsFetched) dispatch(addPost(newPost));
        navigate(`/post/${newPost.$id}`);
      }
    } catch (error) {
      setError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderErrors = useMemo(() => {
    const errorMessages = [
      errors?.title?.message,
      errors?.excerpt?.message,
      errors?.content?.message,
      error,
    ]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="text-red text-center pt-2">{errorMessages}</p>
    ) : null;
  }, [errors, error]);

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
          maxLength: {
            value: 150,
            message: "Post title must be less than 150 characters",
          },
        })}
      />

      <Textarea
        id="excerpt"
        placeholder="Enter post excerpt"
        {...register("excerpt", {
          required: true,
          maxLength: {
            value: 300,
            message: "Post excerpt must be less than 300 characters",
          },
        })}
        className="h-28 resize-none"
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
            className={`size-full text-lg cursor-pointer border-1.5 border-black/10 rounded-lg flex items-center justify-center gap-3 ${
              thumbnail.new || thumbnail.old
                ? "text-black fill-black"
                : "text-black/50 fill-black/50"
            }`}
          >
            {!thumbnail.new && !thumbnail.old ? (
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
                  thumbnail.new
                    ? thumbnail.previewUrl
                    : storageService.getFilePreview(thumbnail.old)
                }
                alt="Post Thumbnail"
                className="h-full w-auto object-cover rounded-lg"
              />
            )}

            <span className="w-full overflow-hidden text-nowrap text-ellipsis">
              {!thumbnail.new && !thumbnail.old
                ? "Select or drop post thumbnail"
                : thumbnail.new
                ? thumbnail.new.name
                : thumbnail.old}
            </span>

            {(thumbnail.new || thumbnail.old) && (
              <button
                type="button"
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

      {renderErrors}
    </form>
  );
};

export default PostForm;
