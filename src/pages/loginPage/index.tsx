import { useState } from "react";
import MyInputField from "../../components/myInputField";
import "./style.css";
import MyButton from "../../components/myButton";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="login-page">
      <div className="login-height">
        <div className="login-box">
          <div className="login-details">
            <div className="login-title">
              <h1>Login for Events</h1>
            </div>
            <div className="login-input">
              <MyInputField
                label="Email/Username"
                onChange={handleChange}
                inputName="username"
                value={user.username}
              />
              <MyInputField
                label="Password"
                onChange={handleChange}
                inputName="password"
                value={user.password}
                type="password"
              />
            </div>
            <div className="login-register-div">
              <div className="login-button-div">
                <MyButton title="Login" className="login-button" />
              </div>
              <div className="register-text">
                <p>Don't have an account?</p>
                <p className="create-account-button" onClick={() => {navigate("/register")}}> Create Account</p>
              </div>
            </div>
          </div>
          <div className="terms-div">
            <p>
              By continuing, you agree to Event's{" "}
              <a className="text-link">Terms of Use </a> and
            </p>
            <p>
              {" "}
              confirmed that you have read the Event's{" "}
              <a className="text-link">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
      <div className="color-gradient-1"></div>
      <div className="color-gradient-2"></div>
      <div className="color-gradient-3"></div>
    </div>
  );
}
