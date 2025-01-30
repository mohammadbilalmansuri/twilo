import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  name,
  control,
  defaultValue = "Enter post content",
}) {
  return (
    <div className="w-full h-[500px]">
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="epivuqih8joupa8ehphk8iqckt0o1qg3w7zhw4g5ickmz7ge"
            initialValue={defaultValue}
            init={{
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
              // content_style:
              //   "body { font-family: Helvetica,Arial,sans-serif; font-size:18px; }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
