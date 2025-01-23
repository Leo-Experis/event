import { useNavigate } from "react-router-dom";
import "./style.css";
export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found-body">
      <div className="not-found-box">
        <div className="not-found-title">
          <h3>
            404: Page <p className="not-dashed"> Not </p> Found
          </h3>
        </div>
        <div className="not-found-toaster">
          <p>We couldn't find the page you were looking for. </p>
          <p>
            Head back to the{" "}
            <a
              className="go-back-home"
              onClick={() => {
                navigate("/");
              }}
            >
              Home Page
            </a>
          </p>
        </div>
      </div>
      <div className="color-gradient-1"></div>
      <div className="color-gradient-2"></div>
      <div className="color-gradient-3"></div>
    </div>
  );
}
