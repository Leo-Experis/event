import { useState } from "react";
import MyInputField from "../../../components/myInputField";
import MyButton from "../../../components/myButton";
import { useNavigate } from "react-router-dom";
import "./style.css";
import useAuth from "../../../hooks/useAuth";
import { MyErrorResponse } from "../../../proptypes/ResponseProp";
import useProfile from "../../../hooks/useProfile";
import DatePicker from "react-datepicker";

export default function RegsiterPage() {
  const { onRegister } = useAuth();
  const { setUsernameEmail } = useProfile();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [dob, setDOB] = useState<Date | null>(new Date());
  const [error, setError] = useState<MyErrorResponse>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setNewUser({ ...newUser, [name]: value });
  };

  const handleRegister = async () => {
    const res = await onRegister(newUser);
    if (res.status_code == 201) {
      setUsernameEmail(newUser.username, newUser.email);
      navigate("/login");
    } else {
      setError({
        error: true,
        status_code: res.status_code,
        message: res.data,
      });
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
              <div className="date-picker-div">
                <DatePicker
                  showIcon={true}
                  onChange={(date) => setDOB(date)}
                  placeholderText="Select your Date of Birth"
                  className="date-picker"
                  dateFormat={"YYYY-MM-dd"}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  name="dob"
                  value={dob ? dob.toISOString().split("T")[0] : ""}
                  icon={
                    <img
                      src="/icons/uit_calender.svg"
                      alt="calendar-icon"
                      className="input-icon date-picker-icon"
                    />
                  }
                />
              </div>
            </div>
            {error?.error ? (
              <div className="error-message">{error.message}</div>
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
