import config from "../config";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import Loader from "./Loader";

export default function RTE({
  name,
  control,
  placeholder = "",
  defaultValue = "",
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={`w-full relative${
        loading
          ? " h-[500px] rounded-lg border-1.5 border-black/10 flex flex-col items-center justify-center"
          : ""
      }`}
    >
      {loading && (
        <div className="absolute z-10">
          <Loader />
        </div>
      )}

      <div
        className={`size-full relative${
          loading ? " opacity-0 pointer-events-none" : ""
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
                placeholder,
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
                  "codesample",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "emoticons",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | searchreplace | code | fullscreen | help",
                content_style:
                  "body { font-size:18px; } * { margin: 0; box-sizing: border-box;}",
              }}
              onInit={() => setLoading(false)}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
