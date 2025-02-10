import { useState, useRef } from "react";
import { Textarea, Button, RTE, Loader } from "./index";
import { getFilePreview } from "../appwrite/storage";
import { useForm } from "react-hook-form";
import { usePostActions, useNotification } from "../hooks";
import cn from "../utils/cn";

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      summary: post?.summary || "",
      content: post?.content || "",
    },
  });
  const { notify } = useNotification();
  const { create, update, loading } = usePostActions();
  const fileInputRef = useRef(null);
  const [thumbnail, setThumbnail] = useState({
    old: post?.thumbnail || null,
    new: null,
    previewUrl: null,
  });

  const handleFileChange = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      notify({ type: "error", message: "File size exceeds the 10MB limit." });
      return;
    }
    if (thumbnail.previewUrl) URL.revokeObjectURL(thumbnail.previewUrl);
    setThumbnail((prev) => ({
      ...prev,
      new: file,
      previewUrl: URL.createObjectURL(file),
    }));
  };

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

  const onSubmit = ({ summary, content }) => {
    post
      ? update(post, { summary, content, thumbnail })
      : create({ summary, content, thumbnail });
  };

  const renderFormErrors = () => {
    const errorMessages = [errors?.summary?.message, errors?.content?.message]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="text text-red text-center">{errorMessages}</p>
    ) : null;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full relative flex flex-col lg:gap-4 gap-3"
    >
      <Textarea
        placeholder="Write a post summary"
        maxLength={500}
        {...register("summary", {
          required: true,
          maxLength: {
            value: 500,
            message: "Post summary cannot exceed 500 characters",
          },
        })}
      />

      <RTE
        name="content"
        control={control}
        placeholder="Write full content (optional)"
        defaultValue={getValues("content")}
      />

      <div className="w-full relative flex sm:flex-row flex-col lg:gap-4 gap-3">
        <div className="sm:w-1/2 h-16 relative">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="hidden opacity-0 relative z-0"
          />

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className={cn(
              "size-full sm:text-lg text-base leading-none cursor-pointer border-1.5 border-black/10 rounded-lg flex items-center justify-center gap-2 sm:gap-3",
              thumbnail.new || thumbnail.old
                ? "text-black fill-black"
                : "text-black/60 fill-black/60"
            )}
          >
            {!thumbnail.new && !thumbnail.old ? (
              <svg
                viewBox="0 0 512 512"
                className="md:size-8 sm:size-7 size-6 min-w-fit pl-3"
              >
                <path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
              </svg>
            ) : (
              <img
                src={
                  thumbnail.new
                    ? thumbnail.previewUrl
                    : getFilePreview(thumbnail.old)
                }
                alt="Post Thumbnail"
                className="h-full w-auto object-cover rounded-lg bg-black/5"
              />
            )}

            <span className="w-full overflow-hidden text-nowrap text-ellipsis">
              {!thumbnail.new && !thumbnail.old
                ? "Upload or drag a thumbnail image"
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
                <svg viewBox="0 0 384 512" className="size-4">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <Button type="submit" disabled={loading} className="sm:w-1/2 sm:h-16">
          {loading ? (
            <Loader size="sm" color="white" />
          ) : post ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </div>

      {renderFormErrors()}
    </form>
  );
};

export default PostForm;
