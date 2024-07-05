import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import Skeleton from "../components/Skeleton";
import { IBlog } from "../models/IBlog";
import Avatar from "../components/Avatar";

const Blog = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState<IBlog>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/signup");
    }
  }, []);

  const getBlogDetails = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://backend.kamrankhan027-kk.workers.dev/api/v1/blogs/blog/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    setBlogDetails(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getBlogDetails();
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
    <div className="h-screen">
      <AppBar />
      <div className="flex items-center justify-center h-3/4 ">
        <div className="flex items-center justify-between px-3 max-w-screen-lg gap-x-10">
          <div className="flex flex-col gap-2">
            <div className="text-4xl font-extrabold">{blogDetails?.title}</div>
            <div
              className="text-xl "
              dangerouslySetInnerHTML={{ __html: blogDetails?.content ?? "" }}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="font-light">Author</div>
            <div className="flex items-center justify-between gap-5">
              <Avatar name={blogDetails?.author.name ?? "Anonymous"} />
              <div>{blogDetails?.author.name ?? "Anonymous"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
