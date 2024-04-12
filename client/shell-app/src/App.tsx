// shell-app/src/App.jsx
import { useState, useEffect, lazy, Suspense } from "react";
import { useQuery, gql } from "@apollo/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import Cookies from "js-cookie";

const UserApp = lazy(() => import("userApp/App"!));
const VitalSignApp = lazy(() => import("vitalSignApp/App"!));
const AlertApp = lazy(() => import("alertApp/App"!));
const SymptomApp = lazy(() => import("symptomApp/App"!));
const MotivationApp = lazy(() => import("motivationApp/App"!));
const GameApp = lazy(() => import("gameApp/App"!));

// GraphQL query to check the current user's authentication status
const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      username
    }
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Use Apollo's useQuery hook to perform the authentication status check on app load
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });

  console.log(data);

  useEffect(() => {
    // Listen for the custom loginSuccess event from the UserApp
    const handleLoginSuccess = (event: any) => {
      setIsLoggedIn(event.detail.isLoggedIn);
    };

    window.addEventListener("loginSuccess", handleLoginSuccess);

    // Check the authentication status based on the query's result
    if (!loading && !error) {
      setIsLoggedIn(!!data.currentUser);
    }

    return () => {
      window.removeEventListener("loginSuccess", handleLoginSuccess);
    };
  }, [loading, error, data]);

  const cookie2 = Cookies.get("token");
  console.log("token:", cookie2);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
            {!isLoggedIn ? (
              <Route path="auth" element={<UserApp />} />
            ) : (
              <>
                <Route path="/vital-sign" element={<VitalSignApp />} />
                <Route path="/alert" element={<AlertApp />} />
                <Route path="/symptom" element={<SymptomApp />} />
                <Route path="/motivation" element={<MotivationApp />} />
                <Route path="/game" element={<GameApp />} />
              </>
            )}
          </Routes>
        </Router>

        {/* <Router>
          <NavBar isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/vital-sign" element={<VitalSignApp />} />
            <Route path="/alert" element={<AlertApp />} />
            <Route path="/symptom" element={<SymptomApp />} />
            <Route path="/motivation" element={<MotivationApp />} />
            <Route path="/game" element={<GameApp />} />
          </Routes>
        </Router> */}
      </Suspense>
    </div>
  );
}

export default App;
