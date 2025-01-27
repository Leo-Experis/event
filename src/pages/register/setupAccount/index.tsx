import { useState } from "react";
import useProfile from "../../../hooks/useProfile";
import MyInputField from "../../../components/myInputField";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import MyButton from "../../../components/myButton";
import { useNavigate } from "react-router-dom";
import { ProfileProp } from "../../../proptypes/ProfileProp";

export default function SetupAccount() {
  const { getProfile, updateProfile } = useProfile();
  const navigate = useNavigate();
  const [fullName, setFullname] = useState("")

  const [profile, setProfile] = useState<ProfileProp>({
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    username: getProfile().username,
    email: getProfile().email,
    profilePicture: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    if (name == "fullName") {
      setFullname(value);

    } else {
      setProfile({ ...profile, [name]: value });
    }

  };

  const handleSubmit = async () => {
    const nameSplit = fullName.split(" ")
    console.log(nameSplit)
    await setProfile({
      ...profile,
      ['firstName']: nameSplit[0],
      ['lastName']: nameSplit[1]
    })
    await updateProfile(profile);
    navigate("/addProfilePicture")
  }

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
