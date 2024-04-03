// shell-app/src/App.jsx
import { useState, useEffect, lazy, Suspense } from "react";
import { useQuery, gql } from "@apollo/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import "./App.css";
import NavBar from "./components/NavBar";

const UserApp = lazy(() => import("userApp/App"!));
const VitalSignApp = lazy(() => import("vitalSignApp/App"!));
const AlertApp = lazy(() => import("alertApp/App"!));
const SymptomApp = lazy(() => import("symptomApp/App"!));
const MotivationApp = lazy(() => import("motivationApp/App"!));

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {/* {!isLoggedIn ? (
          <UserApp />
        ) : (
          
            <Router>
              <NavBar />
              <Routes>
                <Route path="/vital-sign" element={<VitalSignApp />} />
                <Route path="/alert" element={<AlertApp />} />
                <Route path="/symptom" element={<SymptomApp />} />
                <Route path="/motivation" element={<MotivationApp />} />
              </Routes>
            </Router>
           
        )} */}
        <Router>
          <NavBar />
          <Routes>
            <Route path="/vital-sign" element={<VitalSignApp />} />
            <Route path="/alert" element={<AlertApp />} />
            <Route path="/symptom" element={<SymptomApp />} />
            <Route path="/motivation" element={<MotivationApp />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
