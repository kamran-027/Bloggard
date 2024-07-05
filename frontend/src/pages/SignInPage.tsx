import SignIn from "../components/SignIn";
import Testimonial from "../components/Testimonial";

const SignInPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <SignIn />
      </div>
      <div className="invisible lg:visible">
        <Testimonial />
      </div>
    </div>
  );
};

export default SignInPage;
