// user-app/src/App.jsx
import "./App.css";
import UserComponent from "./UserComponent";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql", // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <Router>
      <div className="App">
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/auth" element={<UserComponent />} />
          </Routes>
        </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
