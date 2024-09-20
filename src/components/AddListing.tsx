import { useNavigate } from "react-router-dom";
import Header from "./Header";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "../styles/listingPage.css";
import { CheckOutlined } from "@ant-design/icons";

const schema = yup.object().shape({
  address: yup.string().required("Address is required"),
  image: yup
    .mixed()
    .test("required", "Image is required", (value) => {
      return value && (value as FileList).length > 0;
    })
    .test("fileType", "Unsupported file type", (value) => {
      return (
        value &&
        ["image/jpeg", "image/png"].includes((value as FileList)[0]?.type)
      );
    }),
  region_id: yup.number().required("Region is required").positive().integer(),
  description: yup.string().required("Description is required"),
  city_id: yup.number().required("City is required").positive().integer(),
  zip_code: yup
    .string()
    .required("Zip Code is required")
    .matches(/^\d{5}$/, "Zip Code must be exactly 5 digits"),
  price: yup.number().required("Price is required").positive(),
  area: yup.number().required("Area is required").positive(),
  bedrooms: yup
    .number()
    .required("Number of bedrooms is required")
    .positive()
    .integer(),
  is_rental: yup
    .number()
    .required("Transaction type is required")
    .oneOf([0, 1], "Must be 0 (For Sale) or 1 (For Rent)"),
  agent_id: yup.number().required("Agent is required").positive().integer(),
});

interface IFormInputs {
  address: string;
  image: FileList;
  region_id: number;
  description: string;
  city_id: number;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  agent_id: number;
}

const AddListing: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema as yup.AnyObjectSchema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("image", data.image[0]); // Only first image is uploaded
    formData.append("region_id", data.region_id.toString());
    formData.append("description", data.description);
    formData.append("city_id", data.city_id.toString());
    formData.append("zip_code", data.zip_code);
    formData.append("price", data.price.toString());
    formData.append("area", data.area.toString());
    formData.append("bedrooms", data.bedrooms.toString());
    formData.append("is_rental", data.is_rental.toString());
    formData.append("agent_id", data.agent_id.toString());

    const token = "9cfdee15-9ebf-4031-9312-e527806e013f";

    try {
      await axios.post(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Apartment listing added successfully");
      reset();
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit the listing");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="listingPage">
      <Header />
      <h1>ლისტინგის დამატება</h1>
      <form className="listingForm" onSubmit={handleSubmit(onSubmit)}>
        {/* Is Rental */}
        <div className="isRental">
          <label className="title">გარიგების ტიპი</label>
          <div>
            <input
              className="saleInput"
              type="radio"
              value="0"
              {...register("is_rental")}
            />
            <label>იყიდება</label>
            <input
              className="rentInput"
              type="radio"
              value="1"
              {...register("is_rental")}
            />
            <label>ქირავდება</label>
          </div>
          <p style={{ color: "red" }}>{errors.is_rental?.message}</p>
        </div>
        {/* Location */}
        <label className="locationTitle" htmlFor="">
          მდებარეობა
        </label>
        <div className="location">
          {/* Address */}
          <div className="address">
            <label>მისამართი *</label>
            <input type="text" {...register("address")} />
            <p style={{ color: errors.address ? "red" : "black" }}>
              <CheckOutlined /> მინიმუმ ორი სიმბოლო
            </p>
          </div>

          {/* Zip Code */}
          <div className="zipCode">
            <label>საფოსტო ინდექსი *</label>
            <input type="text" {...register("zip_code")} />
            <p style={{ color: errors.zip_code ? "red" : "black" }}>
              <CheckOutlined /> მხოლოდ რიცხვები
            </p>
          </div>

          <div className="region">
            <label>რეგიონი</label>
            <select {...register("region_id")}>
              <option value={1}>იმერეთ</option>
              <option value={0}>გურია</option>
            </select>
            <p style={{ color: "red" }}>{errors.region_id?.message}</p>
          </div>

          {/* City */}

          <div className="city">
            <label>ქალაქი</label>
            <select {...register("city_id")}>
              <option value={1}>თელავ</option>
              <option value={0}>გურჯაანი</option>
            </select>
            <p style={{ color: "red" }}>{errors.city_id?.message}</p>
          </div>
        </div>

        {/* Image */}
        <div>
          <label>Image</label>
          <input type="file" {...register("image")} />
          <p style={{ color: "red" }}>{errors.image?.message}</p>
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea {...register("description")} />
          <p style={{ color: "red" }}>{errors.description?.message}</p>
        </div>

        {/* Price */}
        <div>
          <label>Price</label>
          <input type="number" {...register("price")} />
          <p style={{ color: "red" }}>{errors.price?.message}</p>
        </div>

        {/* Area */}
        <div>
          <label>Area (m²)</label>
          <input type="number" {...register("area")} />
          <p style={{ color: "red" }}>{errors.area?.message}</p>
        </div>

        {/* Bedrooms */}
        <div>
          <label>Bedrooms</label>
          <input type="number" {...register("bedrooms")} />
          <p style={{ color: "red" }}>{errors.bedrooms?.message}</p>
        </div>

        {/* Agent */}
        <div>
          <label>Agent</label>
          <input type="number" {...register("agent_id")} />
          <p style={{ color: "red" }}>{errors.agent_id?.message}</p>
        </div>

        {/* Buttons */}
        <div>
          <button type="button" onClick={() => reset()}>
            Cancel
          </button>
          <button type="submit">Add Listing</button>
        </div>
      </form>
      <button className="listing" onClick={() => navigate("/")}>
        Home page
      </button>
    </div>
  );
};

export default AddListing;
