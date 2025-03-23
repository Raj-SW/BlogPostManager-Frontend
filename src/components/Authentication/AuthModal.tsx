// src/components/AuthModal/AuthModal.tsx
import { useDispatch } from 'react-redux'
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { nativeLogin, nativeSignup } from '../../api/authenticationService/AuthService';
import { setToken, setUser, authenticateUser } from '../../api/authenticationService/AuthSlice';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';
import { AppDispatch } from '../../Service/statemanagement/store';

interface AuthModalProps {
  show: boolean;
  onHide: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onHide }) => {
  // Toggle between Login and Sign Up
  const [isSignUp, setIsSignUp] = useState(false);

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign Up form states
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  //state managenment
const dispatch = useDispatch<AppDispatch>(); // dispatch is correctly typed

  // Close modal & reset fields
  const handleClose = () => {
    onHide();
    setIsSignUp(false);
    // Reset login states
    setLoginEmail('');
    setLoginPassword('');
    setShowLoginPassword(false);
    // Reset signup states
    setSignupFirstName('');
    setSignupLastName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setShowSignUpPassword(false);
    setShowSignUpConfirmPassword(false);
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await nativeLogin({ email: loginEmail, password: loginPassword });

        dispatch(setToken(response.resultObject.token));
        dispatch(setUser(response.resultObject));
        dispatch(authenticateUser(true));
        localStorage.setItem('token',response.resultObject.token)
        console.log('response:', response);
        console.log('token:', response.resultObject.token);
        console.log('user:', response.resultObject);
      handleClose();
    } catch (error: any) {
      alert(`Login failed: ${error.message}`);
    }
  };

  // Handle Sign Up
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await nativeSignup({
        firstName: signupFirstName,
        lastName: signupLastName,
        email: signupEmail,
        password: signupPassword,
      });
      console.log('Signup success:', response);
      // Optionally store token, e.g., localStorage.setItem('token', response.token);
      handleClose();
    } catch (error: any) {
      console.error('Signup error:', error.message);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isSignUp ? 'Create Your Account' : 'Log In'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isSignUp ? (
          <SignupForm
            firstName={signupFirstName}
            lastName={signupLastName}
            email={signupEmail}
            password={signupPassword}
            confirmPassword={signupConfirmPassword}
            showPassword={showSignUpPassword}
            showConfirmPassword={showSignUpConfirmPassword}
            onFirstNameChange={setSignupFirstName}
            onLastNameChange={setSignupLastName}
            onEmailChange={setSignupEmail}
            onPasswordChange={setSignupPassword}
            onConfirmPasswordChange={setSignupConfirmPassword}
            onTogglePassword={() => setShowSignUpPassword(!showSignUpPassword)}
            onToggleConfirmPassword={() =>
              setShowSignUpConfirmPassword(!showSignUpConfirmPassword)
            }
            onSubmit={handleSignupSubmit}
          />
        ) : (
          <LoginForm
            email={loginEmail}
            password={loginPassword}
            showPassword={showLoginPassword}
            onEmailChange={setLoginEmail}
            onPasswordChange={setLoginPassword}
            onTogglePassword={() => setShowLoginPassword(!showLoginPassword)}
            onSubmit={handleLoginSubmit}
          />
        )}
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        {isSignUp ? (
          <p className="mb-0">
            Already have an account?{' '}
            <Button variant="link" className="p-0" onClick={toggleSignUp}>
              Log In
            </Button>
          </p>
        ) : (
          <p className="mb-0">
            Don’t have an account?{' '}
            <Button variant="link" className="p-0" onClick={toggleSignUp}>
              Sign Up
            </Button>
          </p>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;