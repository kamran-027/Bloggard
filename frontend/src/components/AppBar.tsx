import Avatar from "./Avatar";
import Logo from "../assets/medium-logo.svg";
import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <div className="border-b border-slate-200 flex justify-between px-5 items-center py-3">
      <Link to={"/blogs"}>
        <div>
          <img src={Logo} className="w-12 h-12" />
        </div>
      </Link>
      <Link to={"/blogs"}>
        <div className="font-extrabold text-4xl font-mono">Freedium</div>
      </Link>
      <div className="flex items-center gap-x-3.5">
        <Link to={"/addBlog"}>
          <div className="cursor-pointer font-mono">Publish</div>
        </Link>
        <button
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          className="flex text-sm bg-gray-200 rounded-full md:me-0 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-200"
          type="button"
        >
          <Avatar name="Kamran Khan" size="big" />
        </button>

        <div
          id="dropdownAvatar"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="py-2">
            <Link
              to={"/signin"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
