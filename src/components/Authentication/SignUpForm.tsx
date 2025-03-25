import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";

interface SignupFormProps {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onUsernameChange: (value: string) => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  username,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  onUsernameChange,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="signupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupEmail">
        <Form.Label>Email address</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaEnvelope />
          </InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaKey />
          </InputGroup.Text>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />
          <InputGroup.Text
            style={{ cursor: "pointer" }}
            onClick={onTogglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaKey />
          </InputGroup.Text>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            required
          />
          <InputGroup.Text
            style={{ cursor: "pointer" }}
            onClick={onToggleConfirmPassword}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignupForm;
