import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Alert from "./components/Alert";
import AlertForm from "./components/AlertForm";

const client = new ApolloClient({
  uri: "http://localhost:4003/graphql", // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <Router>
      <div className="App">
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/alert" element={<Alert />} />
            <Route path="/alert/add" element={<AlertForm />} />
            <Route path="/alert/edit/:id" element={<AlertForm />} />
          </Routes>
        </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
