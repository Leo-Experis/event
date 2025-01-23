import { useState } from "react";
import DatePicker from "react-datepicker";
import useProfile from "../../hooks/useProfile";
import MyInputField from "../../components/myInputField";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import { ProfileProp } from "../../proptypes/UserProp";
import MyButton from "../../components/myButton";

export default function SetupAccount() {
  const [dob, setDOB] = useState<Date | null>(new Date());
  const { username, email } = useProfile();

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
          <div className="date-picker-div">
            <DatePicker
              showIcon={true}
              selected={dob}
              onChange={(date) => setDOB(date)}
              placeholderText="Select your Date of Birth"
              className="date-picker"
              dateFormat={"YYYY-MM-dd"}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              icon={
                <img
                  src="/icons/uit_calender.svg"
                  alt="calendar-icon"
                  className="input-icon date-picker-icon"
                />
              }
            />
          </div>
          <div className="continue-setup-div">
            <MyButton
              onClick={() => {}}
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
