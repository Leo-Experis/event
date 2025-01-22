import { useState } from "react";
import MyInputField from "../../components/myInputField";
import "./style.css";
import MyButton from "../../components/myButton";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ErrorResponse } from "../../proptypes/ResponseProp";

export default function LoginPage() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { onLogin } = useAuth();
  const [error, setError] = useState<ErrorResponse>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(user.username);
    const res = await onLogin(user.username, user.password);
    if (res.status_code == 200) {
      navigate("/");
    } else {
      setError({ error: true, error_code: res.status_code, data: res.data });
    }
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
                onChange={handleChange}
                placeholder="Email/Username"
                inputName="username"
                value={user.username}
                icon="/icons/email-icon.svg"
              />
              <div className="space"></div>
              <MyInputField
                onChange={handleChange}
                placeholder="Password"
                inputName="password"
                value={user.password}
                type="password"
                icon="/icons/password-icon.svg"
                changeVisibility={true}
              />
            </div>
            {error?.error ? (
              <div className="error-message">{error.data}</div>
            ) : (
              <div className="error-message-holder"></div>
            )}
            <div className="login-register-div">
              <div className="login-button-div">
                <MyButton
                  onClick={handleSubmit}
                  title="Login"
                  className="login-button"
                />
              </div>
              <div className="register-text">
                <p>Don't have an account?</p>
                <p
                  className="create-account-button"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  {" "}
                  Create Account
                </p>
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
