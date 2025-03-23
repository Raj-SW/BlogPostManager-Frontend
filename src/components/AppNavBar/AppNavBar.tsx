// src/components/AppNavBar/AppNavbar.tsx

import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FiUser } from 'react-icons/fi';
import AuthModal from '../Authentication/AuthModal';
import { useAppSelector, RootState, AppDispatch } from '../../Service/statemanagement/store';
import { useDispatch } from 'react-redux';
import { clearAuthState } from '../../api/authenticationService/AuthSlice'
import { useNavigate } from 'react-router-dom';

const AppNavbar: React.FC = () => {

  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleOpenModal = () => setShowAuthModal(true);
  const handleCloseModal = () => setShowAuthModal(false);

  var userName = useAppSelector((state: RootState) => state.auth.user.userName);
  var isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(clearAuthState());
    localStorage.removeItem('token');
  };

   const navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand href="#">Unplugged Journal</Navbar.Brand>
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
                  <NavDropdown.Item onClick={ () => navigate('/profile')}>
                    View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => navigate('/dashboard')}>
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

      {/* Auth Modal */}
      <AuthModal show={showAuthModal} onHide={handleCloseModal} />
    </>
  );
};

export default AppNavbar;
