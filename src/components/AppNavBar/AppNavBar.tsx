// src/components/AppNavBar/AppNavbar.tsx

import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FiUser } from 'react-icons/fi';
import AuthModal from '../Authentication/AuthModal';
import { useAppSelector, RootState, AppDispatch } from '../../Service/StateManagement/store';
import { useDispatch } from 'react-redux';
import { clearAuthState } from '../../api/AuthenticationService/AuthSlice'
const AppNavbar: React.FC = () => {

  // State to track modal visibility
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Handlers to open/close the modal
  const handleOpenModal = () => setShowAuthModal(true);
  const handleCloseModal = () => setShowAuthModal(false);

  //check if user logged in or not
  var userName = useAppSelector((state: RootState) => state.auth.user.userName);
  var isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  const handleViewProfile = () => {
    console.log('Viewing profile...');
  };

  const handleSignOut = () => {
    dispatch(clearAuthState());
    localStorage.removeItem('token');
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand href="#">Unplugged Journal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
               {!isAuthenticated ? (
                // If not logged in, show the login link
                <Nav.Link onClick={handleOpenModal}>
                  <FiUser className="me-1" />
                  Login
                </Nav.Link>
              ) : (
                // If logged in, show a dropdown with user actions
                <NavDropdown
                  title={
                    <>
                      <FiUser className="me-1" />
                      {userName || 'User'}
                    </>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item onClick={handleViewProfile}>
                    View Profile
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

      {/* Auth Modal */}
      <AuthModal show={showAuthModal} onHide={handleCloseModal} />
    </>
  );
};

export default AppNavbar;
