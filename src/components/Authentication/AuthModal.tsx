// src/components/AuthModal/AuthModal.tsx
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  nativeLogin,
  nativeSignup,
} from "../../api/authenticationService/AuthService";
import {
  setToken,
  setUser,
  authenticateUser,
} from "../../api/authenticationService/AuthSlice";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import { AppDispatch } from "../../Service/statemanagement/store";
import CustomToast from "../CustomToast/CustomToast";

interface AuthModalProps {
  show: boolean;
  onHide: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onHide }) => {
  // Toggle between Login and Sign Up
  const [isSignUp, setIsSignUp] = useState(false);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign Up form states
  const [signupUserName, setSignupUserName] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] =
    useState(false);

  // Toast states
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "danger">(
    "success"
  );
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  // Close modal & reset fields
  const handleClose = () => {
    onHide();
    setIsSignUp(false);
    // Reset login states
    setLoginEmail("");
    setLoginPassword("");
    setShowLoginPassword(false);
    // Reset signup states
    setSignupUserName("");
    setSignupFirstName("");
    setSignupLastName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setShowSignUpPassword(false);
    setShowSignUpConfirmPassword(false);
  };

  const toggleSignUp = () => setIsSignUp((prev) => !prev);

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await nativeLogin({
        email: loginEmail,
        password: loginPassword,
      });
      dispatch(setToken(response.resultObject.token));
      dispatch(setUser(response.resultObject));
      dispatch(authenticateUser(true));
      localStorage.setItem("token", response.resultObject.token);
      setToastMessage("Logged in successfully!");
      setToastVariant("success");
      setShowToast(true);
      handleClose();
    } catch (error: any) {
      setToastMessage(`Login failed: ${error.message}`);
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  // Handle Sign Up
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      setToastMessage("Passwords do not match!");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }
    try {
      const response = await nativeSignup({
        firstName: signupFirstName,
        lastName: signupLastName,
        email: signupEmail,
        password: signupPassword,
        confirmPassword: signupConfirmPassword,
        userName: signupUserName,
      });
      setToastMessage("Signup successful! Try Login now");
      setToastVariant("success");
      setShowToast(true);
      handleClose();
    } catch (error: any) {
      setToastMessage(`Signup failed: ${error.message}`);
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isSignUp ? "Create Your Account" : "Log In"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isSignUp ? (
            <SignupForm
              username={signupUserName}
              firstName={signupFirstName}
              lastName={signupLastName}
              email={signupEmail}
              password={signupPassword}
              confirmPassword={signupConfirmPassword}
              showPassword={showSignUpPassword}
              showConfirmPassword={showSignUpConfirmPassword}
              onUsernameChange={setSignupUserName}
              onFirstNameChange={setSignupFirstName}
              onLastNameChange={setSignupLastName}
              onEmailChange={setSignupEmail}
              onPasswordChange={setSignupPassword}
              onConfirmPasswordChange={setSignupConfirmPassword}
              onTogglePassword={() => setShowSignUpPassword((prev) => !prev)}
              onToggleConfirmPassword={() =>
                setShowSignUpConfirmPassword((prev) => !prev)
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
              onTogglePassword={() => setShowLoginPassword((prev) => !prev)}
              onSubmit={handleLoginSubmit}
            />
          )}
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          {isSignUp ? (
            <p className="mb-0">
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={toggleSignUp}>
                Log In
              </Button>
            </p>
          ) : (
            <p className="mb-0">
              Don’t have an account?{" "}
              <Button variant="link" className="p-0" onClick={toggleSignUp}>
                Sign Up
              </Button>
            </p>
          )}
        </Modal.Footer>
      </Modal>

      <CustomToast
        message={toastMessage}
        variant={toastVariant}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default AuthModal;
