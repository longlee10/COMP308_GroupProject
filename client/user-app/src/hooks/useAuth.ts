import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/queries/authQueries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UpdateFunction = (input: string) => void;

const useAuth = (setActiveTab?: UpdateFunction) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [register] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      alert("Registration successful! Please log in.");
      setActiveTab!("signin"); // Switch to login view
    },
    onError: (error) => {
      setAuthError(error.message || "Registration failed");
      console.log(error);
    },
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: () => {
      // Dispatch custom event upon successful login
      window.dispatchEvent(
        new CustomEvent("loginSuccess", { detail: { isLoggedIn: true } })
      );
      // notify the user
      alert("Login successful!");
      // refresh page
      navigate("/");
      window.location.reload();
    },
    onError: (error) => setAuthError(error.message || "Login failed"),
  });

  const handleAuth = async (type: string) => {
    setIsSubmitting(true);
    setAuthError("");

    if (!username || !password) {
      setAuthError("Username and password are required.");
      setIsSubmitting(false);
      return;
    }

    type === "signup"
      ? await register({ variables: { username, password } })
      : await login({ variables: { username, password } });

    setIsSubmitting(false);
  };

  return {
    isSubmitting,
    setIsSubmitting,
    authError,
    setAuthError,
    handleAuth,
    username,
    setUsername,
    password,
    setPassword,
  };
};

export { useAuth };
