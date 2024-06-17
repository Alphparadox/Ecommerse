import React, { useState } from "react";
import "./CSS/login.css";

export default function Login() {
  const [formState, setFormState] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [isChecked, setIsChecked] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    } else {
      alert(data.error);
    }
  };

  const signup = async () => {
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    } else {
      alert(data.errors);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleContinue = () => {
    if (isChecked) {
      formState === "login" ? login() : signup();
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  return (
    <div className="login-signup">
      <div className="login-container">
        <h1>{formState}</h1>
        <div className="login-field">
          {formState === "signup" && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Your Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Your Password"
          />
        </div>
        <button onClick={handleContinue}>Continue</button>
        <p className="login-login">
          {formState === "signup" ? (
            <>
              Already have an account?
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setFormState("login")}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create an account?
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setFormState("signup")}
              >
                Signup here
              </span>
            </>
          )}
        </p>
        <div className="login-agree">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p>By continuing, I agree to the terms and conditions</p>
        </div>
      </div>
    </div>
  );
}
