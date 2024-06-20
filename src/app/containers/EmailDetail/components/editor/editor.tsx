import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

// Define custom icons
const customIcons = {
  codeBlock: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="ql-stroke" stroke="currentColor">
      <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clip-rule="evenodd"/>
    </svg>
  `,
};

// Register the custom icon with Quill
const icons = ReactQuill.Quill.import("ui/icons");
icons["code-block"] = customIcons.codeBlock;

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }, { font: [] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "link",
        "code",
        "code-block",
      ],
      [
        { align: [] },
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    handlers: {
      "code-block": function () {
        //@ts-ignore
        this.quill.format("code-block", !this.quill.getFormat()["code-block"]);
      },
    },
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
  "code",
  "code-block",
];

const RichTextEditorContainer = styled.div`
  width: 100%;

  .ql-toolbar {
    background-color: var(--dark-gray);
    border: none !important;
    border-radius: 4px 4px 0 0;
    display: flex;
    position: sticky;
    top: 24px;
    z-index: 1003;
    cursor: pointer;
  }

  .ql-container {
    position: relative;
    border: none !important;
    border-radius: 0 0 4px 4px;
  }

  .ql-editor {
    padding: 15px;
    font-size: 16px;
    line-height: 1.5;
    min-height: 200px;
    max-height: 300px;
    background-color: var(--background);
  }

  .ql-snow .ql-code-block-container {
    border-left: 4px solid transparent;
    padding: 10px;
    font-family: monospace;
  }

  .ql-toolbar .ql-formats {
    display: flex;
    align-items: center;
  }

  .ql-toolbar .ql-picker {
    height: 100%;
    display: flex;
    border: none !important;
    background: none;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .ql-toolbar .ql-picker-label {
    transition:
      background-color 0.3s,
      color 0.3s;
    border-radius: 3px;
    &:hover {
      background-color: var(--dark-gray-hover);
      color: var(--text) !important;
    }
  }
  .ql-picker-label {
    padding-top: 3px;
  }

  .ql-toolbar .ql-picker-options {
    padding: 0px;
    background-color: var(--dark-gray);
    border-radius: 0 0 4px 4px;
  }

  .ql-toolbar .ql-picker-item {
    padding: 8px;
    transition:
      background-color 0.3s,
      color 0.3s;
    &:hover {
      background-color: var(--dark-gray-hover);
    }
  }

  .ql-toolbar .ql-formats button {
    border: none !important;
    background: none;
    width: 30px;
    height: 30px;
    padding: 3px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
    border-radius: 3px;
    &:hover {
      background-color: var(--dark-gray-hover);
    }

    &:focus {
      outline: none;
    }
  }

  .ql-toolbar .ql-formats button.ql-active {
    background-color: var(--bright-blue);
  }
  .ql-stroke {
    stroke: var(--text) !important;
  }

  .ql-fill {
    fill: var(--text) !important;
  }

  .ql-picker {
    color: var(--text) !important;
  }

  .ql-picker-options .ql-picker-item {
    color: var(--text) !important;
  }
  /* .ql-stroke:hover,
  .ql-fill:hover,
  .ql-picker:hover,
  .ql-picker-options .ql-picker-item:hover {
    stroke: var(--dark-gray-hover) !important;
    fill: var(--dark-gray-hover) !important;
    color: var(--dark-gray-hover) !important;
  } */
`;

const RichTextEditor = () => {
  const [value, setValue] = useState("");
  const quillRef = useRef<any>(null);

  return (
    <RichTextEditorContainer>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
    </RichTextEditorContainer>
  );
};

export default RichTextEditor;
