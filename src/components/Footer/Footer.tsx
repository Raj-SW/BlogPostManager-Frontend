import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-4 mt-4 border-top bottom">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <p className="text-muted small mb-0">
              &copy; {new Date().getFullYear()} Unplugged Journal. All rights reserved.
            </p>
          </Col>
          <Col md={6}>
            <div className="d-flex justify-content-md-end gap-3">
              <a href="#" className="text-muted small">
                Facebook
              </a>
              <a href="#" className="text-muted small">
                Twitter
              </a>
              <a href="#" className="text-muted small">
                Instagram
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
