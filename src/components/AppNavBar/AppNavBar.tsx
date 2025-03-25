// src/components/AppNavbar/AppNavbar.tsx
import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import AuthModal from "../Authentication/AuthModal";
import {
  useAppSelector,
  RootState,
  AppDispatch,
} from "../../Service/statemanagement/store";
import { useDispatch } from "react-redux";
import { clearAuthState } from "../../api/authenticationService/AuthSlice";
import { useNavigate } from "react-router-dom";
import CustomToast from "../CustomToast/CustomToast";

const AppNavbar: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "danger">(
    "success"
  );
  const [showToast, setShowToast] = useState(false);

  const handleOpenModal = () => setShowAuthModal(true);
  const handleCloseModal = () => setShowAuthModal(false);

  const userName = useAppSelector(
    (state: RootState) => state.auth.user?.userName
  );
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(clearAuthState());
    localStorage.removeItem("token");
    setToastMessage("Signed out successfully!");
    setToastVariant("success");
    setShowToast(true);
    navigate("/home");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand href="/home">BlogPost</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!isAuthenticated ? (
                <Nav.Link onClick={handleOpenModal}>
                  <FiUser className="me-1" />
                  Login
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={
                    <>
                      <FiUser className="me-1" />
                      {userName}
                    </>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSignOut}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal show={showAuthModal} onHide={handleCloseModal} />

      <CustomToast
        message={toastMessage}
        variant={toastVariant}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default AppNavbar;
