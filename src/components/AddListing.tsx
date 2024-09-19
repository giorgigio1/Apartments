import { useNavigate } from "react-router-dom";
import Header from "./Header";

const AddListing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <h1>Add Lising</h1>
      <button className="listing" onClick={() => navigate("/")}>
        Home page
      </button>
    </div>
  );
};

export default AddListing;
