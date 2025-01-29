import { useState } from "react";
import useProfile from "../../../hooks/useProfile";
import MyInputField from "../../../components/myInputField";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import MyButton from "../../../components/myButton";
import { useNavigate } from "react-router-dom";
import { ProfileProp } from "../../../proptypes/ProfileProp";
import useAuth from "../../../hooks/useAuth";

export default function SetupAccount() {
  const { getProfile, registerProfile } = useProfile();
  const { updateProfileSet } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullname] = useState("");

  const [profile, setProfile] = useState<ProfileProp>({
    id: 0,
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    username: getProfile().username,
    email: getProfile().email,
    profilePicture: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    if (name == "fullName") {
      const nameSplit = value.split(" ");
      setFullname(value);
      setProfile({
        ...profile,
        ["firstName"]: nameSplit[0],
        ["lastName"]: nameSplit[1],
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const res = await registerProfile(profile);
    console.log(res);
    if (res.status_code == 201 && "data" in res) {
      updateProfileSet(res.data.username, { profileSet: true });
      navigate("/addProfilePicture");
    }
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
            inputName="fullName"
            value={fullName}
            icon="/icons/iconoir_user.svg"
          />

          <MyInputField
            onChange={handleChange}
            placeholder="Phone number"
            inputName="phoneNumber"
            value={profile.phoneNumber}
            icon="/icons/phone-icon.svg"
          />

          <div className="continue-setup-div">
            <MyButton
              onClick={handleSubmit}
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
