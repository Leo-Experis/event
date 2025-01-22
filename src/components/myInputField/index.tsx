import { useState } from "react";
import "./style.css";

const MyInputField = ({
  label,
  onChange,
  placeholder,
  className,
  inputName,
  value,
  disabled,
  type,
  icon,
  changeVisibility,
}: {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string
  className?: string;
  inputName: string;
  value: string;
  disabled?: boolean;
  type?: string;
  icon?: string /* PATH TO SVG */;
  changeVisibility?: boolean /* PATH TO SVG */;
}) => {
  const [textType, setTextType] = useState(type || "text");

  const changeTextType = () => {
    textType == "password" ? setTextType("text") : setTextType("password");
  };

  return (
    <div className="text-field-div">
      <div className="text-field-label">
        {label && <label className="text-field-label">{label}</label>}
        <div className="input-container">
          {icon && (
            <img src={icon} alt={`${inputName}-icon`} className="input-icon" />
          )}
          <input
            onChange={onChange}
            name={inputName}
            className={`${className} input-field`}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            type={textType}
          />
          {changeVisibility && (
            <img
              src={"/icons/change-visibility.svg"}
              alt="change-visibility-icon"
              className="trailing-icon"
              onClick={changeTextType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInputField;
