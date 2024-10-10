import { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import "../styles/homeList.css";

export interface RealEstate {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  image: string;
  is_rental: number;
  city_id: number;
  city: {
    id: number;
    name: string;
    region_id: number;
    region: {
      id: number;
      name: string;
    };
  };
}

const HomeList = () => {
  const [realEstates, setRealEstates] = useState<RealEstate[]>();
  const token = "9cfdee15-9ebf-4031-9312-e527806e013f";

  const fetchRealEstates = async () => {
    try {
      const response = await axios.get(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRealEstates(response.data);
    } catch (error) {
      console.error("There was an error fetching real estates:", error);
    }
  };

  useEffect(() => {
    fetchRealEstates();
  }, [token]);

  return (
    <div className="homeList">
      {realEstates?.map((realEstate: RealEstate) => (
        <Cards key={realEstate.id} realEstate={realEstate} />
      ))}
    </div>
  );
};

export default HomeList;
