import React from "react";
import "./modal.scss";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
const BaseImageFormat = Quill.import("formats/image");
const ImageFormatAttributesList = ["alt", "height", "width", "style"];

class ImageFormat extends BaseImageFormat {
  static formats(domNode: any) {
    return ImageFormatAttributesList.reduce((formats: any, attribute: any) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  format(name: any, value: any) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
Quill.register(ImageFormat, true);
Quill.register("modules/imageResize", ImageResize);

interface IProps {
  closeModalFn?: () => void;
  openCloseModal?: boolean;
  handleChange?: (html: string) => void;
  editorState: any;
}

const modules = {
  imageResize: {},
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image"],
    ["clean"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" }
    ]
  ]
};

export const EditorModal = ({ handleChange, editorState }: IProps) => {
  return (
    <ReactQuill
      modules={modules}
      theme='snow'
      value={editorState}
      onChange={handleChange}
      bounds={"#app"}
    />
  );
};
export default EditorModal;
