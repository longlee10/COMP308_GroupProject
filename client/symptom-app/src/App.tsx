import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Symptoms from "./components/Symptoms";

const client = new ApolloClient({
  uri: "http://localhost:4004/graphql", // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <Router>
      <div className="App">
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/symptom" element={<Symptoms />} />
          </Routes>
        </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
