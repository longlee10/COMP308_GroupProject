import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ErrorPage = () => {
  return (
    <div>
      <h1 className="text-2xl">Sorry... This page does not exist.</h1>
      <Link to="/">
        <Button className="mt-3">Go to Home Page</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
