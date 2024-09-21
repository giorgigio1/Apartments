import { useNavigate } from "react-router-dom";
import Header from "./Header";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "../styles/listingPage.css";
import { CheckOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { addListingSchema } from "../validationSchema/schema";
import { RiDeleteBinLine } from "react-icons/ri";

interface IFormInputs {
  address: string;
  image: FileList | null;
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

interface Region {
  id: number;
  name: string;
}

interface Agent {
  id: number;
  name: string;
  surname: string;
  avatar: string;
}

interface City {
  id: number;
  name: string;
  region_id: number;
}

const AddListing: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    resolver: yupResolver(addListingSchema as yup.AnyObjectSchema),
  });

  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

  const token = "9cfdee15-9ebf-4031-9312-e527806e013f";

  // Fetch regions
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(
          "https://api.real-estate-manager.redberryinternship.ge/api/regions"
        );
        setRegions(response.data);
      } catch (error) {
        console.error("Error fetching regions", error);
      }
    };
    fetchRegions();
  }, []);

  // Fetch cities based on selected region
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedRegion !== null) {
        try {
          const response = await axios.get(
            "https://api.real-estate-manager.redberryinternship.ge/api/cities"
          );
          const filteredCities = response.data.filter(
            (city: City) => city.region_id === selectedRegion
          );
          setCities(filteredCities);
        } catch (error) {
          console.error("Error fetching cities", error);
        }
      }
    };
    fetchCities();
  }, [selectedRegion]);

  // Fetch agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(
          "https://api.real-estate-manager.redberryinternship.ge/api/agents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents", error);
      }
    };
    fetchAgents();
  }, []);

  // Handle form submission
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("region_id", data.region_id.toString());
    formData.append("description", data.description);
    formData.append("city_id", data.city_id.toString());
    formData.append("zip_code", data.zip_code);
    formData.append("price", data.price.toString());
    formData.append("area", data.area.toString());
    formData.append("bedrooms", data.bedrooms.toString());
    formData.append("is_rental", data.is_rental.toString());
    formData.append("agent_id", data.agent_id.toString());
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

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
      navigate("/");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit the listing");
    }
  };

  // Handle image upload and preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue("image", e.target.files, { shouldValidate: true });
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImagePreview(imageUrl);
    }
  };

  const handleImageDelete = () => {
    setImagePreview(null);
    setValue("image", null, { shouldValidate: true });
  };

  const navigate = useNavigate();

  return (
    <div className="listingPage">
      <Header />
      <h1>ლისტინგის დამატება</h1>
      <form className="listingForm" onSubmit={handleSubmit(onSubmit)}>
        {/* Transaction Type */}
        <div className="isRental">
          <label className="title listingTitles">გარიგების ტიპი</label>
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
          <p className="listingErrors">
            {errors.is_rental?.message && "აირჩიეთ გარიგების ტიპი"}
          </p>
        </div>

        {/* Address and Location */}
        <label className="locationTitle listingTitles">მდებარეობა</label>
        <div className="location">
          {/* Address */}
          <div className="address">
            <label className="categoryTitle">მისამართი *</label>
            <input type="text" {...register("address")} />
            <p
              style={{
                color: errors.address ? "red" : "black",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              <CheckOutlined /> მინიმუმ ორი სიმბოლო
            </p>
          </div>

          {/* Zip Code */}
          <div className="zipCode">
            <label className="categoryTitle">საფოსტო ინდექსი *</label>
            <input type="text" {...register("zip_code")} />
            <p
              style={{
                color: errors.zip_code ? "red" : "black",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              <CheckOutlined /> მხოლოდ რიცხვები
            </p>
          </div>

          {/* Region */}
          <div className="region">
            <label className="categoryTitle">რეგიონი</label>
            <select
              {...register("region_id")}
              onChange={(e) => setSelectedRegion(Number(e.target.value))}
            >
              <option value=""></option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
            <p className="listingErrors">
              {errors.region_id?.message && "აირჩიეთ რეგიონი"}
            </p>
          </div>

          {/* City */}
          <div className="city">
            <label className="categoryTitle">ქალაქი</label>
            <select {...register("city_id")} disabled={!selectedRegion}>
              <option value=""></option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <p className="listingErrors">
              {errors.city_id?.message && "აირჩიეთ ქალაქი"}
            </p>
          </div>
        </div>

        {/* Home Details */}
        <label className="homeDetailsLabel listingTitles">ბინის დეტალები</label>
        <div className="homeDetails">
          {/* Price */}
          <div className="price">
            <label className="categoryTitle">ფასი</label>
            <input type="number" {...register("price")} />
            <p
              style={{
                color: errors.price ? "red" : "black",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              <CheckOutlined /> მხოლოდ რიცხვები
            </p>
          </div>

          {/* Area */}
          <div className="area">
            <label className="categoryTitle">ფართობი</label>
            <input type="number" {...register("area")} />
            <p
              style={{
                color: errors.area ? "red" : "black",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              <CheckOutlined /> მხოლოდ რიცხვები
            </p>
          </div>

          {/* Bedrooms */}
          <div className="bedrooms">
            <label className="categoryTitle">საძინებლების რაოდენობა*</label>
            <input type="number" {...register("bedrooms")} />
            <p
              style={{
                color: errors.bedrooms ? "red" : "black",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              <CheckOutlined /> მხოლოდ რიცხვები
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <label className="categoryTitle">აღწერა *</label>
          <textarea {...register("description")} />
          <p
            style={{
              color: errors.description ? "red" : "black",
              fontWeight: "400",
              fontSize: "14px",
              marginTop: "5px",
            }}
          >
            <CheckOutlined /> მინიმუმ 5 სიტყვა
          </p>
        </div>

        {/* Image Upload */}
        <div className="uploadPicture uploadPicture2">
          <label className="categoryTitle" htmlFor="profilePicture">
            ატვირთეთ ფოტო *
          </label>
          <label className="custom-file-upload">
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden-input"
            />
            <PlusCircleOutlined className="upload-icon" />
          </label>
          <p className="listingErrors">
            {errors.image ? "გთხოვთ ატვირთეთ ფოტო" : ""}
          </p>
          {imagePreview && (
            <div className="image-preview-container">
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="image-preview"
              />
              <RiDeleteBinLine
                className="delete-icon"
                onClick={handleImageDelete}
              />
            </div>
          )}
        </div>

        {/* Agent Selection */}
        <label className="listingTitles" htmlFor="აგენტი">
          აგენტი
        </label>
        <div className="agent">
          <label className="categoryTitle">აირჩიე</label>
          <select {...register("agent_id")}>
            <option value=""></option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
          <p className="listingErrors">
            {errors.agent_id?.message && "აირჩიეთ აგენტი"}
          </p>
        </div>

        {/* Form Actions */}
        <div className="  ">
          <button
            className="cancelButton"
            type="button"
            onClick={() => navigate("/")}
          >
            გაუქმება
          </button>
          <button className="addListingButton" type="submit">
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
