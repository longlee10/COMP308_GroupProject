// shell-app/src/App.jsx
import { lazy, Suspense } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import { useGetCurrentUser } from "./hooks";
import { Button } from "./components/ui/button";
import Spinner from "./components/Spinner";

const UserApp = lazy(() => import("userApp/App"!));
const VitalSignApp = lazy(() => import("vitalSignApp/App"!));
const AlertApp = lazy(() => import("alertApp/App"!));
const SymptomApp = lazy(() => import("symptomApp/App"!));
const MotivationApp = lazy(() => import("motivationApp/App"!));
const GameApp = lazy(() => import("gameApp/App"!));

function App() {
  const { loading, error, data, refetch } = useGetCurrentUser();

  if (error)
    return (
      <div className="h-screen flex flex-col justify-center gap-5 items-center">
        <p>Error! {error.message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
        OR
        <Link to="/">
          <Button>Go to Hompage</Button>
        </Link>
      </div>
    );

  if (!loading)
    return (
      <div className="App">
        <Suspense fallback={<Spinner />}>
          <Router>
            <NavBar user={data!} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<ErrorPage />} />
              {/* Should add ! to ensure only display when logged in ???*/}
              {!data?.currentUser ? (
                <Route path="/auth" element={<UserApp />} />
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
        </Suspense>
      </div>
    );
}

export default App;
