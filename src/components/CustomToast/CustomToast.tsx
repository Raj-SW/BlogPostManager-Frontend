// src/components/CustomToast.tsx
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface CustomToastProps {
  message: string;
  variant: "success" | "danger";
  show: boolean;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  message,
  variant,
  show,
  onClose,
}) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast bg={variant} onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;
