import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUpPage";
import SignIn from "./pages/SignInPage";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import AddBlog from "./pages/AddBlog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/addBlog" element={<AddBlog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
