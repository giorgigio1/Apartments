import Header from "./Header";
import Filter from "./Filter";
import HomeList from "./HomeList";

const Home = () => {
  return (
    <>
      <Header />
      <Filter />
      <div style={{ margin: "20px" }}></div>
      <HomeList />
    </>
  );
};

export default Home;
