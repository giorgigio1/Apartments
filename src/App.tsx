import "antd/dist/reset.css";
import "./App.css";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Cards from "./components/Cards";

function App() {
  return (
    <>
      <Header />
      <Filter />
      <div style={{ margin: "20px" }}></div>
      <Cards />
    </>
  );
}

export default App;
