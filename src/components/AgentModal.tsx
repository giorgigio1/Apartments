import React from "react";
import "../index.css";
import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckOutlined } from "@ant-design/icons";
import schema from "../validationSchema/schema";
import "../styles/agentModal.css";

interface AgentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: FileList;
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);

    if (data.profilePicture && data.profilePicture.length > 0) {
      formData.append("profilePicture", data.profilePicture[0]);
    } else {
      console.error("No profile picture selected.");
    }

    try {
      // Replace with your API endpoint
      await fetch("/your-api-endpoint", {
        method: "POST",
        body: formData,
      });
      setIsModalOpen(false); // Close the modal on successful submit
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue("profilePicture", e.target.files, { shouldValidate: true }); // Update profilePicture value in the form state
    }
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
      okText="Submit"
      cancelText="Cancel"
    >
      <form>
        <div className="firstLastName">
          {/* Name Input */}
          <div className="firstname">
            <label htmlFor="name">სახელი *</label>
            <input id="name" {...register("name")} type="text" />
            <p style={{ color: errors.name ? "red" : "black" }}>
              <CheckOutlined /> მინიმუმ ორი სიმბოლო
            </p>
          </div>

          {/* Last Name Input */}
          <div className="lastname">
            <label htmlFor="lastName">გვარი</label>
            <input id="lastName" {...register("lastName")} type="text" />
            <p style={{ color: errors.lastName ? "red" : "black" }}>
              <CheckOutlined /> მინიმუმ ორი სიმბოლო
            </p>
          </div>
        </div>
        <div className="emailNumber">
          {/* Email Input */}
          <div className="email">
            <label htmlFor="email">ელ-ფოსტა*</label>
            <input id="email" {...register("email")} type="email" />
            <p style={{ color: errors.email ? "red" : "black" }}>
              <CheckOutlined /> გამოიყენეთ @redberry.ge ფოსტა
            </p>
          </div>

          {/* Phone Number Input */}
          <div className="phone">
            <label htmlFor="phoneNumber">ტელეფონის ნომერი</label>
            <input id="phoneNumber" {...register("phoneNumber")} type="text" />
            <p style={{ color: errors.phoneNumber ? "red" : "black" }}>
              <CheckOutlined /> მხოლოდ რიცხვები
            </p>
          </div>
        </div>

        {/* Profile Picture Upload */}
        <div>
          <label htmlFor="profilePicture">ატვირთეთ ფოტო *</label>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleImageUpload} // Handle file changes here
            // Don't add {...register("profilePicture")} here
          />
          <p style={{ color: errors.profilePicture ? "red" : "black" }}>
            {errors.profilePicture
              ? errors.profilePicture.message
              : "Please upload a profile picture"}
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default AgentModal;
