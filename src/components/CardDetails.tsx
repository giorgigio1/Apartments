import { useLocation, useNavigate } from "react-router-dom";
import bedrooms from "../images/bedrooms.png";
import area from "../images/area.png";
import zipCode from "../images/zipCode.png";
import location from "../images/location.png";
import arrowLeft from "../images/arrowLeft.png";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import "../styles/cardDetails.css";

interface HomeInfo {
  id: number;
  address: string;
  image: string;
  zip_code: string;
  description: string;
  price: number;
  bedrooms: number;
  area: number;
  is_rental: number;
  agent_id: number;
  city_id: number;
  created_at: string;
  city: {
    id: number;
    name: string;
    region_id: number;
    region: {
      id: number;
      name: string;
    };
  };
  agent: {
    id: number;
    name: string;
    surname: string;
    email: string;
    avatar: string;
    phone: string;
  };
}

const CardDetails: React.FC = () => {
  const [homeInfo, setHomeInfo] = useState<HomeInfo>();

  const { id } = useLocation().state;
  const navigate = useNavigate();

  const token = "9cfdee15-9ebf-4031-9312-e527806e013f";

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHomeInfo(response.data);
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    };
    fetchCardDetails();
  }, []);

  return (
    <>
      <Header />
      <input
        type="image"
        className="arrowLeft"
        src={arrowLeft}
        alt="Back"
        onClick={() => navigate("/")}
      />

      <div className="details">
        <div className="leftCard">
          <img className="" src={homeInfo?.image} alt="" />
          <label htmlFor="">{homeInfo?.created_at}</label>
          <p>{homeInfo?.is_rental === 0 ? "ქირავდება" : "იყიდება"}</p>
        </div>
        <div className="rightCard">
          <h2>{homeInfo?.price} ₾</h2>
          <p>
            <img src={location} alt="" /> {homeInfo?.city_id},{" "}
            {homeInfo?.address}
          </p>
          <p>
            <img src={area} alt="" /> ფართი{homeInfo?.area} მ²
          </p>
          <p>
            <img src={bedrooms} alt="" /> საძინებელი {homeInfo?.bedrooms}
          </p>
          <p>
            <img src={zipCode} alt="" /> საფოსტო ინდექსი {homeInfo?.zip_code}
          </p>
          <p>{homeInfo?.description}</p>
          <div className="agent">
            <img
              src={homeInfo?.agent.avatar}
              style={{ width: "50px" }}
              alt=""
            />
            <p>
              {homeInfo?.agent.name} {homeInfo?.agent.surname}
            </p>
            <label htmlFor="agent">აგენტი</label>
            <p>
              <AiOutlineMail />
              {homeInfo?.agent.email}
            </p>

            <p>
              <FiPhoneCall />
              {homeInfo?.agent.phone}
            </p>
          </div>
          <button>ლისტინგის წაშლა</button>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
