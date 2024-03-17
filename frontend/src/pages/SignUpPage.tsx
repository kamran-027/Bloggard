import SignUp from "../components/SignUp";
import Testimonial from "../components/Testimonial";

const SignUpPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <SignUp />
      </div>
      <div className="invisible lg:visible">
        <Testimonial />
      </div>
    </div>
  );
};

export default SignUpPage;
