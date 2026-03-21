# Password Reset Application

A React-based password reset application with Bootstrap UI framework.

## Features

### 1. **Forgot Password Page**
   - User enters their email address
   - Email validation
   - Sends reset link to registered email
   - Success/Error messages
   - Link to sign in page

### 2. **Password Reset Page**
   - Password strength validation
   - Show/Hide password toggles
   - Confirm password matching
   - Password requirements display:
     - Minimum 8 characters
     - Contains uppercase letters
     - Contains lowercase letters
     - Contains numbers
   - Success message with redirect to login

## Project Structure

```
Password Reset/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── ForgotPassword.js
│   │   └── PasswordReset.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Installation

1. Navigate to the project directory:
```bash
cd "Password Reset"
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Routes

- `/` - Forgot Password Page
- `/forgot-password` - Forgot Password Page
- `/reset-password/:token` - Password Reset Page (token from email link)

## API Endpoints (Backend Required)

This application expects a backend API with the following endpoints:

### 1. Forgot Password
- **POST** `/api/forgot-password`
- **Body**: `{ email: "user@example.com" }`
- **Response**: `{ message: "Email sent successfully" }`

### 2. Reset Password
- **POST** `/api/reset-password/:token`
- **Body**: `{ password: "newPassword123", confirmPassword: "newPassword123" }`
- **Response**: `{ message: "Password reset successfully" }`

## Customization

### API Base URL
Update the API endpoint in the components:
- In `ForgotPassword.js`: Line 32
- In `PasswordReset.js`: Line 68

Replace `http://localhost:5000` with your actual backend server URL.

### Styling
All styles are in `index.css`. Bootstrap utilities are used for layout and responsive design.

### Password Validation Rules
Edit the `validatePassword` function in `PasswordReset.js` to customize password requirements.

## Technologies Used

- **React** 18.2.0
- **React Router DOM** 6.22.0
- **Bootstrap** 5.3.0
- **Axios** 1.6.0

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The application is fully responsive and works on mobile, tablet, and desktop devices
- Form validation is performed on the client side
- Error messages are dismissible alerts
- Loading states are shown during API calls
- Passwords are sent over HTTPS (ensure your backend uses HTTPS in production)

## License

This project is open source and available for educational purposes.
