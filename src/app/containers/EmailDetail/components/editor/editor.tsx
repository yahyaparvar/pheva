import { Button } from "app/components/buttons";
import juice from "juice";
import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { EmailDetailselectors } from "../../selectors";
import { emailDetailActions } from "../../slice";
import { RichTextEditorContainer } from "./styles";
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

const SendButtonContainer = styled.div`
  padding: 20px;
  background: var(--background);
`;
const RichTextEditor = () => {
  const quillRef = useRef<any>(null);
  const alignClass = ReactQuill.Quill.import("attributors/style/align");
  const backgroundClass = ReactQuill.Quill.import(
    "attributors/style/background"
  );
  const colorClass = ReactQuill.Quill.import("attributors/style/color");
  const directionClass = ReactQuill.Quill.import("attributors/style/direction");
  const fontClass = ReactQuill.Quill.import("attributors/style/font");
  const Size = ReactQuill.Quill.import("attributors/style/size");
  Size.whitelist = ["16px", "11px", "24px", "40px"];
  ReactQuill.Quill.register(Size, true);
  ReactQuill.Quill.register(alignClass, true);
  ReactQuill.Quill.register(backgroundClass, true);
  ReactQuill.Quill.register(colorClass, true);
  ReactQuill.Quill.register(directionClass, true);
  ReactQuill.Quill.register(fontClass, true);
  icons["code-block"] = customIcons.codeBlock;
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }],

        [{ size: ["16px", "11px", "24px", "40px"] }, { font: [] }],
        ["bold", "italic", "underline", "strike", "link", "code"],
        [{ align: [] }, { list: "ordered" }, { list: "bullet" }],
        ["image"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
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
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "background",
    "code",
  ];
  const mdValue = useSelector(EmailDetailselectors.md);
  const dispatch = useDispatch();
  //@ts-ignore
  const setValue = (value: string,) => {
    dispatch(emailDetailActions.setEmailMd(value));
  };

  const sendEmail = () => {
    const inlinedHtml = juice(mdValue, { applyStyleTags: true });
    dispatch(emailDetailActions.replyToEmail(inlinedHtml));
  };

  return (
    <RichTextEditorContainer>
      <ReactQuill
        ref={quillRef}
        value={mdValue}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
      <SendButtonContainer>
        <Button onClick={sendEmail}>Send</Button>
      </SendButtonContainer>
    </RichTextEditorContainer>
  );
};

export default RichTextEditor;
