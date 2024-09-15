import React from "react";
import "../index.css";
import { Modal } from "antd";

interface AgentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgentModal: React.FC<AgentModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            backgroundColor: "green",
            borderColor: "green",
            color: "white",
          },
          className: "custom-ok-button",
        }}
        cancelButtonProps={{
          style: { backgroundColor: "red", borderColor: "red", color: "white" },
          className: "custom-cancel-button",
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default AgentModal;
