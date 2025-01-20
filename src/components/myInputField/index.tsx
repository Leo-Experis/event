import "./style.css";

const MyInputField = ({
  label,
  onChange,
  className,
  inputName,
  value,
  disabled,
  type,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputName: string;
  value: string;
  disabled?: boolean;
  type?: string;
}) => {
  return (
    <div className="text-field-div">
      <div className="text-field-label">
        <label>{label}</label>
        <input
          onChange={onChange}
          name={inputName}
          className={`${className} input-field`}
          value={value}
          disabled={disabled}
          type={type ? type : "text"}
        />
      </div>
    </div>
  );
};

export default MyInputField;
