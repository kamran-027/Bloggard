import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Skeleton from "../components/Skeleton";

const AddBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/signup");
    }
  }, []);

  const submitBlog = async () => {
    setIsLoading(true);
    const resp = await axios.post(
      `${API_URL}/api/v1/blogs/blog`,
      { title, content: desc },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    setIsLoading(false);
    navigate(`/blog/${resp.data}`);
    setTitle("");
    setDesc("");
  };

  const handleTextChange = (value: string) => {
    setDesc(value);
  };

  if (isLoading) {
    return (
      <div>
        <AppBar />
        <div className="flex items-center justify-center p-10">
          <div className="flex flex-col gap-5">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="flex  justify-center">
        <div className=" pt-5 w-full max-w-screen-sm">
          <div className="mb-6 flex flex-col gap-y-5 items-center">
            <input
              value={title}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
              placeholder="Enter Title"
              type="text"
              id="default-input"
              className="focus:outline-none bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
            <div className="w-full">
              {/* <Editor setVal={setDesc} val={desc} /> */}
              <ReactQuill onChange={handleTextChange} />
            </div>
            <button
              onClick={submitBlog}
              type="button"
              className="text-white w-1/3 bg-sky-600 hover:bg-sky-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
