import { useState } from "react"
import MyInputField from "../../components/myInputField";
import MyButton from "../../components/myButton";
import { useNavigate } from "react-router-dom";
import "./style.css"

export default function RegsiterPage() {
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;

        setNewUser({ ...newUser, [name]: value })
    }

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
                                label="Username"
                                onChange={handleChange}
                                inputName="username"
                                value={newUser.username}
                            />
                            <MyInputField
                                label="Email"
                                onChange={handleChange}
                                inputName="email"
                                value={newUser.email}
                            />
                            <MyInputField
                                label="Password"
                                onChange={handleChange}
                                inputName="password"
                                value={newUser.password}
                                type="password"
                            />
                        </div>
                        <div className="login-register-div">
                            <div className="login-button-div">
                                <MyButton title="Register" className="login-button" />
                            </div>
                            <div className="register-text">
                                <p>Already have an account?</p>
                                <p className="create-account-button" onClick={() => { navigate("/login") }}> Login!</p>
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
    )
}