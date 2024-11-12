import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
	
	e.preventDefault();
  
	try {
    
	  const url = "http://localhost:8080/api/user/register";  // Replace with your API endpoint
	  const { data: res } = await axios.post(url, data);  // Make POST request to API
	  navigate("/login");  // Redirect to login page after successful registration
	  console.log(res.message);  // Log the response message
	} catch (error) {
	  if (error.response && error.response.status >= 400 && error.response.status <= 500) {
		setError(error.response.data.message);  // Display error if registration fails
	  }
	}
  };
  

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            {/* Input fields for user information */}
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />

            {/* Display error message if there's any */}
            {error && <div className={styles.error_msg}>{error}</div>}

            {/* Submit button */}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
