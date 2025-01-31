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
    <div className="w-full h-[600px] bg-black/5 rounded-lg">
      <div
        className={`size-full ${
          loading ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={config.tinyMceApiKey}
              initialValue={defaultValue}
              init={{
                placeholder: placeholder,
                height: 600,
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
                content_style: "body { font-size:18px; }",
                setup: (editor) => {
                  const max = 3000;
                  editor.on("submit", (event) => {
                    const numChars = editor.getContent({
                      format: "text",
                    }).length;

                    if (numChars > max) {
                      alert("Maximum " + max + " characters allowed.");
                      event.preventDefault();
                      return false;
                    }
                  });
                },
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
