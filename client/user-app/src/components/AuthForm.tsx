import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { FormEvent, useState } from "react";
import Alert from "./Alert";
import Spinner from "./Spinner";

interface AuthFormProps {
  setActiveTab?: (tab: string) => void;
  type: "signin" | "signup";
}

const AuthForm = ({ type, setActiveTab }: AuthFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    handleRegister,
    handleLogin,
    authError,
    setAuthError,
    isSubmitting,
    setIsSubmitting,
  } = useAuth(setActiveTab);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");

    if (!username || !password) {
      setAuthError("Username and password are required.");
      setIsSubmitting(false);
      return;
    }

    type === "signup"
      ? await handleRegister(username, password)
      : await handleLogin(username, password);

    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          {type === "signin"
            ? "Please sign in to continue."
            : "Please sign up if you don't have an account."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <form onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password..."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="m-auto mt-3" disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {type === "signin" ? "Sign Me In" : "Sign Me Up"}
          </Button>
        </form>
        <CardFooter>{authError && <Alert message={authError} />}</CardFooter>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
