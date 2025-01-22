import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="navigation-body">
      <div
        className="button home-button"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src="/icons/home-icon.svg"
          alt="Home"
          style={{ width: 30, height: 30 }}
        />

        <div className={`${location.pathname == "/" ? "active" : ""}`}></div>
      </div>

      <div
        className="button search-button"
        onClick={() => {
          navigate("/search");
        }}
      >
        <img
          src="/icons/iconoir_search.svg"
          alt="Home"
          style={{ width: 30, height: 30 }}
        />
        <div
          className={`${location.pathname == "/search" ? "active" : ""}`}
        ></div>
      </div>

      <div className="new-event-button">
        <img
          src="/icons/iconoir_plus-circle-solid.svg"
          alt="Home"
          style={{ width: 50, height: 50 }}
        />
      </div>

      <div className="button calendar-button">
        <img
          src="/icons/uit_calender.svg"
          alt="Home"
          style={{ width: 30, height: 30 }}
        />
        <div
          className={`${location.pathname == "/calendar" ? "active" : ""}`}
        ></div>
      </div>

      <div className="button profile-button">
        <img
          src="/icons/iconoir_user.svg"
          alt="Home"
          style={{ width: 30, height: 30 }}
        />
        <div
          className={`${location.pathname == "/profile" ? "active" : ""}`}
        ></div>
      </div>
    </div>
  );
};

export default NavigationBar;
