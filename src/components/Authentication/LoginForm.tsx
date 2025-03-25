import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="loginEmail">
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

      <Form.Group className="mb-3" controlId="loginPassword">
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

      <div className="d-flex justify-content-end">
        <Button variant="link" size="sm">
          Forgot Password?
        </Button>
      </div>

      <Button variant="primary" type="submit" className="w-100 mt-3">
        Log In
      </Button>
    </Form>
  );
};

export default LoginForm;
