import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    console.log('Submitting email for password reset:', email);
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Replace with your backend API endpoint
      const response = await axios.post('https://password-reset-backend-1-43mx.onrender.com/username/forgot-password', {
        email: email
      });

      setMessage(response.data.message || 'Password reset link has been sent to your email');
      setEmail('');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred. Please try again.');
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={5} sm={8} xs={12}>
            <Card className="auth-card">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold">Forgot Password</h2>
                
                {message && (
                  <Alert variant="success" className="alert-custom" dismissible onClose={() => setMessage('')}>
                    {message}
                  </Alert>
                )}
                
                {error && (
                  <Alert variant="danger" className="alert-custom" dismissible onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}

                <p className="text-muted-custom text-center mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-600">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                      disabled={loading}
                      size="lg"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="btn-custom w-100"
                    type="submit"
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted-custom">
                    Remember your password? <a href="https://passwordreset-fe.netlify.app/login" className="text-decoration-none fw-bold">Sign In</a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
