# React Sign Up Form

This is a simple React sign-up form project built with Vite, TypeScript, React Hook Form, Yup, and Material-UI. The form includes email and password fields with validation and the ability to toggle password visibility.

## Features

- **Vite**: Fast build tool for front-end development.
- **TypeScript**: Typed JavaScript for better development experience.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Yup**: Schema builder for value parsing and validation.
- **Material-UI**: React components for faster and easier web development.

## Getting Started

Follow these instructions to set up and run the project locally.

### Installation

   ```sh
   git clone https://github.com/vozni4iy/react-auth-form-demo.git
   cd react-auth-form-demo
   npm install
   ```

### Start the project

```sh
  npm run dev
```

## Usage

- Email Field: Validates for a required, properly formatted email address.
- Password Field: Validates for a password with the following rules:
  - Must be 8-64 characters long (no spaces).
  - Must contain at least one uppercase letter.
  - Must contain at least one lowercase letter.
  - Must contain at least one digit.
- Adding End Adornment
The password field includes an end adornment that allows users to toggle the visibility of the password.

## License

This project is licensed under the MIT License.
