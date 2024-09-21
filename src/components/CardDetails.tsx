import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useLocation, useNavigate } from "react-router-dom";
import bedrooms from "../images/bedrooms.png";
import area from "../images/area.png";
import zipCode from "../images/zipCode.png";
import location from "../images/location.png";
import arrowLeft from "../images/arrowLeft.png";
import Header from "./Header";

const CardDetails = () => {
  const { data } = useLocation().state;
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <img
        src={arrowLeft}
        alt=""
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", margin: "50px 0 30px 20px" }}
      />
      <Card
        hoverable
        style={{ width: 384 }}
        cover={
          <img
            style={{ width: "384px", height: "307px", objectFit: "cover" }}
            alt="example"
            src={data.image}
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
              {data?.is_rental === 0 ? "ქირავდება" : "იყიდება"}
            </p>
          }
        />
        <Meta title={<h2 style={{ fontWeight: "bold" }}> {data.price} ₾</h2>} />
        <Meta
          description={
            <>
              <img src={location as any} alt="" />
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
      <h1>ბინები მსგავს ლოკაციაზე</h1>
    </>
  );
};

export default CardDetails;
