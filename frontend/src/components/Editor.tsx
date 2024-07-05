import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IQuillProps {
  val: string;
  setVal: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ setVal, val }: IQuillProps) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={val}
        onChange={setVal}
        placeholder="Enter Description"
      />
    </div>
  );
};

export default Editor;
