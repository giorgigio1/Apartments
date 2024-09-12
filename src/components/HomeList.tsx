import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";

export interface RealEstates {
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
  const [data, setData] = useState<RealEstates | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = "9cfdee15-9ebf-4031-9312-e527806e013f";

  const fetchData = async () => {
    try {
      const response = await axios.get<RealEstates>(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "22px",
        }}
      >
        {data?.map((item: RealEstates) => (
          <Cards key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

export default HomeList;
