import React, { useContext, useState, useEffect, useRef } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import logo from "./movieflix.png";
import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  // State for controlling the visibility of the popup
  const [showPopup, setShowPopup] = useState(true); // Display popup initially

  // Ref for modal
  const modalRef = useRef();

  useEffect(() => {
    // Hide the popup after 5 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Function to close the modal when clicking outside of it
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  // Add click event listener to close the modal when clicking outside of it
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}
          ref={modalRef}
        >
          <h2>Welcome to MovieFlix!</h2>
          <p>
            Test user credentials:
            <br />
            Email: movieflix01@gmail.com
            <br />
            Password: 123
          </p>
        </div>
      )}
    </div>
  );
}
