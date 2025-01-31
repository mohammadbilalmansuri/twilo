import config from "../config";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  name,
  control,
  placeholder = "",
  defaultValue = "",
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`w-full h-[500px] rounded-lg${
        loading ? " border border-black/20" : ""
      }`}
    >
      <div
        className={`size-full ${
          loading ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <Controller
          name={name || "content"}
          control={control}
          rules={{
            maxLength: {
              value: 5000,
              message: "Post content limit exceeded",
            },
          }}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={config.tinyMceApiKey}
              initialValue={defaultValue}
              init={{
                placeholder: placeholder,
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-size:18px; } * { margin: 0; box-sizing: border-box;}",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
