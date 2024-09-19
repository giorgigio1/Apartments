import React from "react";
import "../../src/index.css";
import { Card } from "antd";
import bina from "../images/bina.png";
import location from "../images/location.png";
import bedrooms from "../images/bedrooms.png";
import area from "../images/area.png";
import zipCode from "../images/zipCode.png";
import { RealEstates } from "./HomeList";
const { Meta } = Card;

const Cards: React.FC<RealEstates | any> = ({ data }) => {
  return (
    <Card
      hoverable
      style={{ width: 384 }}
      cover={<img alt="example" src={bina} />}
    >
      <Meta
        title={
          <p
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              padding: "5px",
              backgroundColor: "#02152680",
              borderRadius: "20px",
              color: "white",
            }}
          >
            {data?.is_rental === 0 ? "ქირავდება" : "იყიდება"}
          </p>
        }
      />
      <Meta title={<h2 style={{ fontWeight: "bold" }}> {data.price} ₾</h2>} />
      <Meta
        description={
          <>
            <img src={location} alt="" />
            <span style={{ marginLeft: "10px" }}>
              {data?.city.name}, {data?.address}
            </span>
          </>
        }
      />
      <Meta
        description={
          <div style={{ marginTop: "15px" }}>
            <img src={bedrooms} alt="" />{" "}
            <span style={{ marginLeft: "3px" }}>{data?.bedrooms}</span>
            <img style={{ marginLeft: "30px" }} src={area} alt="" />{" "}
            <span style={{ marginLeft: "3px" }}>{data?.area}მ²</span>
            <img style={{ marginLeft: "30px" }} src={zipCode} alt="" />{" "}
            <span style={{ marginLeft: "3px" }}>{data?.zip_code}</span>
          </div>
        }
      />
    </Card>
  );
};

export default Cards;
