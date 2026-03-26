import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Replace with your backend API endpoint
      const response = await axios.post('https://password-reset-backend-2-9gqa.onrender.com/username/addUser', {
        email: email,
        password: password
      });

      setMessage(response.data.message || 'User added successfully!');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to add user. Please try again.');
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
                <h2 className="text-center mb-4 fw-bold">Sign In</h2>
                
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
                  Enter your credentials to access your account.
                </p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-600">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                      disabled={loading}
                      size="lg"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-600">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
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
                    {loading ? 'Adding User...' : 'Add User'}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted-custom">
                    Forgot your password? <a href="/forgot-password" className="text-decoration-none fw-bold">Reset it here</a>
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

export default Login;
