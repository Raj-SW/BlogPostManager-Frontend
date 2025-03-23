// src/pages/UnauthorizedPage.tsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="mb-4">Unauthorized</h1>
      <p className="mb-4">
        You do not have permission to access this page. Please log in with the
        proper credentials or contact your administrator.
      </p>
      <Button variant="primary" onClick={handleGoHome}>
        Go to Home
      </Button>
    </Container>
  );
};

export default UnauthorizedPage;
