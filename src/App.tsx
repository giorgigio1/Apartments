import "antd/dist/reset.css";
import "./App.css";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import HomeList from "./components/HomeList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddListing from "./components/AddListing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddListing />} />
      </Routes>
    </Router>
  );
}

export default App;
