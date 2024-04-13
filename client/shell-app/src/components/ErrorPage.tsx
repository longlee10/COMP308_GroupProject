import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl">Sorry... There is an error occurred.</h1>
      <p className="text-xl">
        This could be due to the page does not exist or you are not logged in.
      </p>
      <Link to="/">
        <Button>Go to Home Page</Button>
      </Link>
      OR
      <Link to="/auth">
        <Button>Login or Register</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
