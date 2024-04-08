import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { getContent } from "../common/functions";

interface IBlogCardProps {
  Name: string | null;
  Title: string;
  Content: string;
  publishedDate: string;
  BlogID: string;
}

const BlogCard = ({
  Name,
  publishedDate,
  Title,
  Content,
  BlogID,
}: IBlogCardProps) => {
  const date = new Date(publishedDate);

  return (
    <Link to={`/blog/${BlogID}`}>
      <div className="p-4 flex flex-col gap-1 border-b border-slate-200 cursor-pointer">
        <div className="flex items-center gap-2 ">
          <Avatar name={Name ?? "Anonymous"} />
          <div className="font-medium">{Name ?? "Anonymous"}</div>
          <div className="h-1 w-1 rounded-xl bg-slate-400"></div>
          <div className="font-thin text-sm">
            {date.toLocaleDateString("default", {
              dateStyle: "long",
            })}
          </div>
        </div>
        <div className="font-extrabold text-lg">{Title}</div>
        <div className="text-sm">{getContent(Content)}</div>
        <div className="font-thin text-sm pt-2">
          {Math.ceil(Content.length / 100)} minute(s) read
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
