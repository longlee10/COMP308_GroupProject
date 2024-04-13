import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TipList from "./components/TipList";
import TipForm from "./components/TipForm";

const client = new ApolloClient({
  uri: "http://localhost:4005/graphql", // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <Router>
      <div className="App">
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/motivation" element={<TipList />} />
            <Route path="/motivation/addTips" element={<TipForm />} />
            <Route path="/motivation/edit/:id" element={<TipForm />} />
          </Routes>
        </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
