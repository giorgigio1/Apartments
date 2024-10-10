import React, { useState } from "react";
import "../index.css";
import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckOutlined, PlusCircleOutlined } from "@ant-design/icons";
import schema from "../validationSchema/schema";
import "../styles/agentModal.css";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";

interface AgentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar?: FileList;
}

const AgentModal: React.FC<AgentModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema as yup.AnyObjectSchema),
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    } else {
      console.error("No profile picture selected.");
    }

    const token = "9cfdee15-9ebf-4031-9312-e527806e013f";

    try {
      await axios.post(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue("avatar", e.target.files, { shouldValidate: true });
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImagePreview(imageUrl);
    }
  };

  const handleImageDelete = () => {
    setImagePreview(null);
    setValue("avatar", undefined, { shouldValidate: true });
  };

  return (
    <Modal
      centered
      width={1009}
      className="agentModal"
      title="აგენტის დამატება"
      open={isModalOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={() => setIsModalOpen(false)}
      okText="დაამატე აგენტი"
      cancelText="გაუქმება"
      okButtonProps={{ className: "custom-ok-button" }}
      cancelButtonProps={{ className: "custom-cancel-button" }}
      closable={false}
    >
      <form>
        <div className="firstLastName">
          <div className="firstname">
            <label htmlFor="name">სახელი *</label>
            <input id="name" {...register("name")} type="text" />
            <p style={{ color: errors.name ? "red" : "black" }}>
              <CheckOutlined /> მინიმუმ ორი სიმბოლო
            </p>
          </div>

          <div className="lastname">
            <label htmlFor="lastName">გვარი</label>
            <input id="lastName" {...register("surname")} type="text" />
            <p style={{ color: errors.surname ? "red" : "black" }}>
              <CheckOutlined /> მინიმუმ ორი სიმბოლო
            </p>
          </div>
        </div>
        <div className="emailNumber">
          <div className="email">
            <label htmlFor="email">ელ-ფოსტა*</label>
            <input id="email" {...register("email")} type="email" />
            <p style={{ color: errors.email ? "red" : "black" }}>
              <CheckOutlined /> გამოიყენეთ @redberry.ge ფოსტა
            </p>
          </div>

          <div className="phone">
            <label htmlFor="phoneNumber">ტელეფონის ნომერი</label>
            <input id="phoneNumber" {...register("phone")} type="text" />
            <p style={{ color: errors.phone ? "red" : "black" }}>
              <CheckOutlined /> მხოლოდ რიცხვები
            </p>
          </div>
        </div>

        <div className="uploadPicture">
          <label htmlFor="profilePicture">ატვირთეთ ფოტო *</label>
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

          <p style={{ color: errors.avatar ? "red" : "black" }}>
            {errors.avatar ? "გთხოვთ ატვირთეთ ფოტო" : ""}
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
      </form>
    </Modal>
  );
};

export default AgentModal;
