import { useState } from "react";
import useProfile from "../../../hooks/useProfile";
import MyInputField from "../../../components/myInputField";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import { ProfileProp } from "../../../proptypes/UserProp";
import MyButton from "../../../components/myButton";
import { useNavigate } from "react-router-dom";

export default function SetupAccount() {
  const { username, email } = useProfile();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileProp>({
    firstName: "",
    lastName: "",
    dob: new Date(),
    phonenumber: "",
    username: username,
    email: email,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="setup-account-body">
      <div className="setup-account-box">
        <div className="setup-account-title">
          <h1>Setup Your Account</h1>
        </div>
        <div className="setup-account-input">
          <MyInputField
            onChange={handleChange}
            placeholder="Email"
            inputName="email"
            value={profile.email}
            disabled={true}
            icon="/icons/email-icon.svg"
          />
          <MyInputField
            onChange={handleChange}
            placeholder="Username"
            inputName="username"
            value={profile.username}
            disabled={true}
            icon="/icons/iconoir_user.svg"
          />
          <MyInputField
            onChange={handleChange}
            placeholder="Full name"
            inputName="firstName"
            value={profile.firstName}
            icon="/icons/iconoir_user.svg"
          />

          <MyInputField
            onChange={handleChange}
            placeholder="Phone number"
            inputName="phonenumber"
            value={profile.phonenumber}
            icon="/icons/phone-icon.svg"
          />

          <div className="continue-setup-div">
            <MyButton
              onClick={() => navigate("/addProfilePicture")}
              title="Next"
              className="login-button"
            />
          </div>
        </div>
      </div>
      <div className="color-gradient-1"></div>
      <div className="color-gradient-2"></div>
      <div className="color-gradient-3"></div>
    </div>
  );
}
