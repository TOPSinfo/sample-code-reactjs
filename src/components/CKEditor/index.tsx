import React from "react";
import { EditorModal } from "components";

interface ICkeditor {
  value: string;
  onValueChange: (data: string) => void;
}
const BasicCkEditor: React.FC<ICkeditor> = ({ value, onValueChange }) => {
  return (
    <div id='app'>
      <EditorModal editorState={value} handleChange={onValueChange} />
    </div>
  );
};
export default BasicCkEditor;
