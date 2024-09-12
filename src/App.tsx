import "antd/dist/reset.css";
import "./App.css";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import HomeList from "./components/HomeList";

function App() {
  return (
    <>
      <Header />
      <Filter />
      <div style={{ margin: "20px" }}></div>
      <HomeList />
    </>
  );
}

export default App;
