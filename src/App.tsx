import "antd/dist/reset.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddListing from "./components/AddListing";
import CardDetails from "./components/CardDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/add" element={<AddListing />} />
      </Routes>
    </Router>
  );
}

export default App;
