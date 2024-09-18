import { useNavigate } from "react-router-dom";
import "../styles/filter.css";
import { useState } from "react";
import AgentModal from "./AgentModal";

const Filter = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<any>(false);

  return (
    <div className="fullBox">
      <div className="filter">
        <select name="" id="">
          <option value="">რეგიონი</option>
          <option value="">abb</option>
          <option value="">abcc</option>
        </select>
        <select name="" id="">
          <option value="">საფასო კატეგორია</option>
          <option value="">abb</option>
          <option value="">abcc</option>
        </select>
        <select name="" id="">
          <option value="">ფართობი</option>
          <option value="">abb</option>
          <option value="">abcc</option>
        </select>
        <select name="" id="">
          <option value="">საძინებლების რაოდენობა</option>
          <option value="">abb</option>
          <option value="">abcc</option>
        </select>
      </div>
      <div className="addButtons">
        <button className="listing" onClick={() => navigate("/add")}>
          + ლისტინგის დამატება
        </button>
        <button className="agent" onClick={() => setIsModalOpen(true)}>
          + აგენტის დამატება
        </button>
      </div>
      <AgentModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Filter;
