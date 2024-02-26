import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/user/:userId" element={<Home />} />
            <Route path="/*" element={<Home isError={true} />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
