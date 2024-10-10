import location from "../images/location.png";
import bedrooms from "../images/bedrooms.png";
import area from "../images/area.png";
import zipCode from "../images/zipCode.png";
import { RealEstate } from "./HomeList";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const Cards = ({ realEstate }: { realEstate: RealEstate }) => {
  return (
    <Link
      to={`/card/${realEstate.id}`}
      state={{ id: realEstate.id }}
      style={{ textDecoration: "none" }}
    >
      <Card
        style={{ width: 384 }}
        cover={
          <img
            style={{ width: "384px", height: "307px", objectFit: "cover" }}
            alt="example"
            src={realEstate.image}
          />
        }
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
              {realEstate?.is_rental === 0 ? "ქირავდება" : "იყიდება"}
            </p>
          }
        />
        <Meta
          title={
            <h2 style={{ fontWeight: "bold" }}>{realEstate.price} 11 ₾</h2>
          }
        />
        <Meta
          description={
            <>
              <img src={location} alt="location" />
              <span style={{ marginLeft: "10px" }}>
                {realEstate?.city.name}, {realEstate?.address}
              </span>
            </>
          }
        />
        <Meta
          description={
            <div style={{ marginTop: "15px" }}>
              <img src={bedrooms} alt="" />{" "}
              <span style={{ marginLeft: "3px" }}>{realEstate?.bedrooms}</span>
              <img style={{ marginLeft: "30px" }} src={area} alt="" />{" "}
              <span style={{ marginLeft: "3px" }}>{realEstate?.area}მ²</span>
              <img style={{ marginLeft: "30px" }} src={zipCode} alt="" />{" "}
              <span style={{ marginLeft: "3px" }}>{realEstate?.zip_code}</span>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default Cards;
