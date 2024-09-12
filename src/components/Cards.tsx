import React from "react";
import "../../src/index.css";
import { Card } from "antd";
import location from "../images/location.png";
import bedrooms from "../images/bedrooms.png";
import area from "../images/area.png";
import zipCode from "../images/zipCode.png";

const { Meta } = Card;

const Cards: React.FC = () => (
  <Card
    hoverable
    style={{ width: 384 }}
    cover={
      <img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title={<h2 style={{ fontWeight: "bold" }}>80 000 ₾</h2>} />
    <Meta
      description={
        <div style={{}}>
          <img src={location} alt="" />
          <span style={{ marginLeft: "10px" }}>თბილისი, ი. ჭავჭავაძის 53</span>
        </div>
      }
    />
    <Meta
      description={
        <div style={{ marginTop: "15px" }}>
          <img src={bedrooms} alt="" />{" "}
          <span style={{ marginLeft: "3px" }}>2</span>
          <img style={{ marginLeft: "30px" }} src={area} alt="" />{" "}
          <span style={{ marginLeft: "3px" }}>55მ²</span>
          <img style={{ marginLeft: "30px" }} src={zipCode} alt="" />{" "}
          <span style={{ marginLeft: "3px" }}>0160</span>
        </div>
      }
    />
  </Card>
);

export default Cards;
