import { useState } from "react";
import MyInputField from "../../components/myInputField";
import MyButton from "../../components/myButton";
import { useNavigate } from "react-router-dom";
import "./style.css";
import useAuth from "../../hooks/useAuth";
import { ErrorResponse } from "../../proptypes/ResponseProp";
import useProfile from "../../hooks/useProfile";

export default function RegsiterPage() {
  const { onRegister } = useAuth();
  const { setUsernameEmail } = useProfile();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorResponse>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setNewUser({ ...newUser, [name]: value });
  };

  const handleRegister = async () => {
    const res = await onRegister(newUser);
    setError({ error: false, error_code: 0, data: "" });
    if (res.status_code == 201) {
      setUsernameEmail({
        username: newUser.username,
        email: newUser.email,
        password: "",
      });
      navigate("/setupAccount");
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
              <h1>Register for Events</h1>
            </div>
            <div className="register-input">
              <MyInputField
                onChange={handleChange}
                placeholder="Email"
                inputName="email"
                value={newUser.email}
                icon="/icons/email-icon.svg"
              />
              <MyInputField
                onChange={handleChange}
                placeholder="Username"
                inputName="username"
                value={newUser.username}
                icon="/icons/iconoir_user.svg"
              />
              <MyInputField
                onChange={handleChange}
                placeholder="Password"
                inputName="password"
                value={newUser.password}
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
                  title="Register"
                  className="login-button"
                  onClick={handleRegister}
                />
              </div>

              <div className="register-text">
                <p>Already have an account?</p>
                <p
                  className="create-account-button"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {" "}
                  Login!
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
