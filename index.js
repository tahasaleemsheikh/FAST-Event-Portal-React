import React from 'react';
import { Container } from 'react-bootstrap';

// Simple reusable footer component
function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <Container>
        <p className="mb-0">
          © 2026 FAST Fest – National University of Computer &amp; Emerging Sciences, Faisalabad-Chiniot Campus
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
