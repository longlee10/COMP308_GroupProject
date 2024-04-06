import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/queries/authQueries";
import { useMutation } from "@apollo/client";
import { useState } from "react";

type UpdateFunction = (input: string) => void;

const useAuth = (setActiveTab?: UpdateFunction) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

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
    },
    onError: (error) => setAuthError(error.message || "Login failed"),
  });

  const handleRegister = async (username: string, password: string) => {
    await register({ variables: { username, password } });
  };

  const handleLogin = async (username: string, password: string) => {
    await login({ variables: { username, password } });
  };

  return {
    isSubmitting,
    setIsSubmitting,
    authError,
    setAuthError,
    handleRegister,
    handleLogin,
  };
};

export { useAuth };
