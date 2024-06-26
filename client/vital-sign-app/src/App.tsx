// import "bootstrap/dist/css/bootstrap.css";
import VitalSigns from "./components/VitalSign";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import VitalSignForm from "./components/VitalSignForm";
import PredictionResult from "./components/PredictionResult";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4002/graphql", // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <Router>
      <div className="App">
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/vital-sign" element={<VitalSigns />} />
            <Route
              path="/vital-sign/addVitalSign"
              element={<VitalSignForm />}
            />
            <Route path="/vital-sign/edit/:id" element={<VitalSignForm />} />
            <Route
              path="/vital-sign/predictDisease/:id"
              element={<PredictionResult />}
            />
          </Routes>
        </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
