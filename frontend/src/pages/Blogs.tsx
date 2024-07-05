import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { IBlog } from "../models/IBlog";
import Skeleton from "../components/Skeleton";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/signup");
    }
  }, []);

  const getBlogs = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://backend.kamrankhan027-kk.workers.dev/api/v1/blogs/blog/bulk`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    setBlogs(resp.data.blogs);
    setIsLoading(false);
  };

  useEffect(() => {
    getBlogs();
  }, []);

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
      <div className="flex justify-center ">
        <div className="max-w-4xl">
          {blogs
            .sort(
              (a: IBlog, b: IBlog) =>
                +new Date(b.publishedDate) - +new Date(a.publishedDate)
            )
            .map((blog: IBlog) => (
              <BlogCard
                Name={blog.author.name}
                Title={blog.title}
                Content={blog.content}
                publishedDate={blog.publishedDate}
                key={blog.id}
                BlogID={blog.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
