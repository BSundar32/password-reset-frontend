import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Replace with your backend API endpoint
      await axios.post(`https://password-reset-backend-2-9gqa.onrender.com/username/reset-password`, {
        newPassword: formData.password,
        resetToken: token
      });

      setMessage('Password has been reset successfully!');
      setFormData({ password: '', confirmPassword: '' });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
                <h2 className="text-center mb-4 fw-bold">Reset Password</h2>

                {message && (
                  <Alert variant="success" className="alert-custom">
                    ✓ {message}
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger" className="alert-custom" dismissible onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}

                <p className="text-muted-custom text-center mb-4">
                  Enter your new password below to reset your account.
                </p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-600">New Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        size="lg"
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </Button>
                    </div>
                    <small className="text-muted text-start d-block mt-2">
                      • At least 8 characters<br />
                      • Must contain uppercase letters<br />
                      • Must contain lowercase letters<br />
                      • Must contain numbers
                    </small>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-600">Confirm Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={loading}
                        size="lg"
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={loading}
                      >
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </Button>
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="btn-custom w-100"
                    type="submit"
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted-custom">
                    Remember your password? <a href="https://pass-res.netlify.app/login" className="text-decoration-none fw-bold">Sign In</a>
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

export default PasswordReset;
